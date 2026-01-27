import express from "express";
import {
  createOrder,
  confirmPayment,
  verifyPayment,
  getAllOrders,
  getOrders,
  getOrderById,
  updateAnyOrder,
  updateOrder,
  getBookedSlots,
} from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

// ===============================
// ADMIN (NO AUTH)
// ===============================
orderRouter.get("/getall", getAllOrders);
orderRouter.put("/getall/:id", updateAnyOrder);

// ===============================
// STRIPE REDIRECT (PUBLIC)
// ===============================
orderRouter.get("/verify", (req, res) => {
  const { session_id, success } = req.query;
  const frontend = (process.env.FRONTEND_URL || "http://localhost:5173").replace(
    /\/+$/,
    ""
  );
  const params = new URLSearchParams();
  if (success != null) params.set("success", String(success));
  if (session_id) params.set("session_id", String(session_id));
  const url = `${frontend}/myorder/verify?${params.toString()}`;
  return res.redirect(302, url);
});

// ===============================
// PROTECTED ROUTES
// ===============================
orderRouter.use(authMiddleware);

// CREATE ORDER
orderRouter.post("/", createOrder);

// USER ORDERS
orderRouter.get("/", getOrders);

// CONFIRM PAYMENT (API / WEBHOOK)
orderRouter.post("/confirm", confirmPayment);

// SINGLE ORDER
orderRouter.get("/:id", getOrderById);
orderRouter.put("/:id", updateOrder);

// BOOKED SLOTS
orderRouter.get("/slots", getBookedSlots);

export default orderRouter;
