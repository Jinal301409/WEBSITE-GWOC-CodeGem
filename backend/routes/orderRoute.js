import express from 'express';
import {
  createOrder,
  confirmPayment,
  getAllOrders,
  getOrders,
  getOrderById,
  updateAnyOrder,
  updateOrder
} from '../controllers/orderController.js';
import authMiddleware from '../middleware/auth.js';

const orderRouter = express.Router();

// ADMIN (no auth)
orderRouter.get('/getall', getAllOrders);
orderRouter.put('/getall/:id', updateAnyOrder);

// PROTECT BELOW ROUTES
orderRouter.use(authMiddleware);

// CREATE ORDER
orderRouter.post('/', createOrder);

// USER ORDERS
orderRouter.get('/', getOrders);

// ⚠️ CONFIRM PAYMENT MUST BE POST (Stripe best practice)
orderRouter.post('/confirm', confirmPayment);

// SINGLE ORDER
orderRouter.get('/:id', getOrderById);
orderRouter.put('/:id', updateOrder);

export default orderRouter;
