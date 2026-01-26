import Stripe from "stripe";
import Order from "../modals/orderModal.js";
import Item from "../modals/itemModal.js";
import "dotenv/config";
import mongoose from "mongoose";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ===============================
// CREATE ORDER
// ===============================
export const createOrder = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      email,
      address,
      city,
      zipCode,
      paymentMethod,
      subtotal,
      tax,
      total,
      items,
      bookingDate,
      timeSlot,
    } = req.body;

    // validate required booking fields
    if (!bookingDate || !timeSlot) {
      return res
        .status(400)
        .json({ message: "Booking date and time slot are required" });
    }

    const bDate = new Date(bookingDate);
    const start = new Date(
      Date.UTC(
        bDate.getUTCFullYear(),
        bDate.getUTCMonth(),
        bDate.getUTCDate(),
        0,
        0,
        0
      )
    );
    const end = new Date(
      Date.UTC(
        bDate.getUTCFullYear(),
        bDate.getUTCMonth(),
        bDate.getUTCDate(),
        23,
        59,
        59,
        999
      )
    );

    // check slot already booked
    const existing = await Order.findOne({
      bookingDate: { $gte: start, $lte: end },
      timeSlot,
    });
    if (existing)
      return res.status(409).json({ message: "Time slot already booked" });

    // create order
    const order = new Order({
      firstName,
      lastName,
      phone,
      email,
      address,
      city,
      zipCode,
      items: items.map((it) => ({
        item: it.itemId ? mongoose.Types.ObjectId(it.itemId) : undefined,
        name: it.name,
        price: it.price,
        quantity: it.quantity,
        imageUrl: it.imageUrl,
      })),
      subtotal,
      tax,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === "online" ? "pending" : "succeeded",
      bookingDate: bDate,
      timeSlot,
    });

    await order.save();

    if (paymentMethod === "online") {
      return res.status(201).json({
        order,
        checkoutUrl: `/mock-checkout/${order._id}`,
      });
    }

    res.status(201).json({ order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ===============================
// CONFIRM PAYMENT (API / WEBHOOK)
// ===============================
export const confirmPayment = async (req, res) => {
  try {
    const session_id = req.body.sessionId || req.query.session_id;

    if (!session_id) {
      return res.status(400).json({ message: "session_id required" });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      const order = await Order.findOneAndUpdate(
        { sessionId: session_id },
        { paymentStatus: "succeeded" },
        { new: true }
      );

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      return res.json({ order });
    }

    res.status(400).json({ message: "Payment not completed" });
  } catch (error) {
    console.error("confirmPayment Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ===============================
// VERIFY PAYMENT (STRIPE REDIRECT)
// ===============================
export const verifyPayment = async (req, res) => {
  try {
    const { success, session_id } = req.query;

    if (success !== "true" || !session_id) {
      return res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      await Order.findOneAndUpdate(
        { sessionId: session_id },
        { paymentStatus: "succeeded" }
      );

      // ✅ REDIRECT TO MY ORDERS PAGE
      return res.redirect(`${process.env.FRONTEND_URL}/my-orders`);
    }

    res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
  } catch (error) {
    console.error("verifyPayment Error:", error);
    res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
  }
};

// ===============================
// GET USER ORDERS
// ===============================
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .lean();

    res.json(orders);
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

// ===============================
// ADMIN: GET ALL ORDERS
// ===============================
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .lean();

    res.json(orders);
  } catch (error) {
    console.error("getAllOrders Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ===============================
// ADMIN: UPDATE ANY ORDER
// ===============================
export const updateAnyOrder = async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("updateAnyOrder Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ===============================
// GET ORDER BY ID
// ===============================
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.user && !order.user.equals(req.user._id)) {
      return res.status(403).json({ message: "Access Denied" });
    }

    res.json(order);
  } catch (error) {
    console.error("getOrderById Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ===============================
// UPDATE ORDER (USER)
// ===============================
export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (!order.user.equals(req.user._id)) {
      return res.status(403).json({ message: "Access Denied" });
    }

    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (error) {
    console.error("updateOrder Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ===============================
// GET BOOKED SLOTS
// ===============================
export const getBookedSlots = async (req, res) => {
  try {
    const { date } = req.query; // ISO date string (YYYY-MM-DD)
    if (!date) return res.status(400).json({ message: "Date required" });

    const start = new Date(date + "T00:00:00.000Z");
    const end = new Date(date + "T23:59:59.999Z");

    const orders = await Order.find({
      bookingDate: { $gte: start, $lte: end },
    });
    const slots = orders.map((o) => o.timeSlot).filter(Boolean);
    res.json({ slots });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ===============================
// GET MONTHLY HEATMAP DATA
// ===============================
export const getMonthlyHeatmap = async (req, res) => {
  try {
    const { month } = req.query; // expected YYYY-MM
    if (!month)
      return res.status(400).json({ message: "month required as YYYY-MM" });

    const [y, m] = month.split("-").map(Number);
    const start = new Date(Date.UTC(y, m - 1, 1));
    const end = new Date(Date.UTC(y, m - 1 + 1, 0, 23, 59, 59, 999));

    const agg = await Order.aggregate([
      { $match: { bookingDate: { $gte: start, $lte: end } } },
      {
        $group: {
          _id: { $dayOfMonth: "$bookingDate" },
          count: { $sum: 1 },
        },
      },
    ]);

    const counts = {};
    agg.forEach((a) => (counts[a._id] = a.count));
    res.json({ counts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
