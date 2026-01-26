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
  getMonthlyHeatmap,
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
orderRouter.get("/verify", verifyPayment);

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

// MONTHLY HEATMAP
orderRouter.get("/heatmap", getMonthlyHeatmap);

export default orderRouter;
