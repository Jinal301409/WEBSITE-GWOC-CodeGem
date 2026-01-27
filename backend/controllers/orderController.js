import Stripe from "stripe";
import Order from "../modals/orderModal.js";
import Item from "../modals/itemModal.js";
import "dotenv/config";

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
    const start = new Date(bDate.toISOString().slice(0, 10) + "T00:00:00.000Z");
    const end = new Date(bDate.toISOString().slice(0, 10) + "T23:59:59.999Z");

    // check slot already booked
    const existing = await Order.findOne({
      bookingDate: { $gte: start, $lte: end },
      timeSlot,
    });
    if (existing)
      return res.status(409).json({ message: "Time slot already booked" });

    const orderItems = items.map(
      ({ item, name, price, imageUrl, quantity }) => {
        const base = item || {};
        return {
          item: {
            name: base.name || name || "unknown",
            price: Number(base.price ?? price ?? 0),
            imageUrl: base.imageUrl || imageUrl || "",
          },
          quantity: Number(quantity) || 1,
        };
      }
    );

    const shippingCost = 0;
    let newOrder;

    // ===============================
    // ONLINE PAYMENT (STRIPE)
    // ===============================
    if (paymentMethod === "online") {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: orderItems.map((o) => ({
          price_data: {
            currency: "inr",
            product_data: { name: o.item.name },
            unit_amount: Math.round(o.item.price * 100),
          },
          quantity: o.quantity,
        })),
        customer_email: email,

        // ✅ CORRECT STRIPE REDIRECT URL
        success_url: `${process.env.BACKEND_URL}/api/orders/verify?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.BACKEND_URL}/api/orders/verify?success=false`,

        metadata: { firstName, lastName, email, phone },
      });

      newOrder = new Order({
        user: req.user?._id,
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
        shipping: shippingCost,
        items: orderItems,
        sessionId: session.id,
        paymentIntentId: session.payment_intent || null,
        paymentStatus: "pending",
        bookingDate: bDate,
        timeSlot,
      });

      await newOrder.save();

      return res.status(201).json({
        order: newOrder,
        checkoutUrl: session.url,
      });
    }

    // ===============================
    // CASH ON DELIVERY
    // ===============================
    newOrder = new Order({
      user: req.user?._id,
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
      shipping: shippingCost,
      items: orderItems,
      paymentStatus: "pending",
      bookingDate: bDate,
      timeSlot,
    });

    await newOrder.save();
    res.status(201).json({ order: newOrder, checkoutUrl: null });
  } catch (error) {
    console.error("CreateOrder Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ===============================
// CONFIRM PAYMENT (API / WEBHOOK)
// ===============================
export const confirmPayment = async (req, res) => {
  try {
    const sessionId = req.body.sessionId || req.query.session_id || req.query.sessionId || req.query.session;
    if (!sessionId) return res.status(400).json({ message: 'sessionId required' });

    // try to find order by various fields
    let order = await Order.findOne({ sessionId })
      || await Order.findOne({ session_id: sessionId })
      || await Order.findOne({ paymentIntentId: sessionId })
      || await Order.findOne({ sessionId: { $exists: true, $eq: sessionId } });

    if (!order) {
      // as a fallback, try to find by order id encoded in sessionId or other heuristics
      return res.status(404).json({ message: 'Order not found for session' });
    }

    order.paymentStatus = 'succeeded';
    if (!order.status) order.status = 'scheduled';
    await order.save();

    res.json({ order });
  } catch (err) {
    console.error('confirmPayment error', err);
    res.status(500).json({ message: 'Server error' });
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
// REDIRECT VERIFY PAYMENT TO FRONTEND
// ===============================
export const verifyRedirect = (req, res) => {
  try {
    const { session_id, sessionId, session, success } = req.query;
    const sid = session_id || sessionId || session;
    const params = new URLSearchParams();
    if (sid) params.set('session_id', sid);
    if (success) params.set('success', success);
    const frontend = (process.env.FRONTEND_URL || 'https://website-gwoc-codegem.onrender.com').replace(/\/+$/, '');
    const redirectTo = `${frontend}/myorder/verify${params.toString() ? ('?' + params.toString()) : ''}`;
    return res.redirect(302, redirectTo);
  } catch (err) {
    console.error('verifyRedirect error', err);
    return res.status(500).send('Server error');
  }
}

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

export default { getBookedSlots, createOrder, confirmPayment, verifyRedirect }
