import express from 'express'
import { getCart, addToCart, updateCartItem, deleteCartItem, clearCart } from '../controllers/cartController.js'


import authMiddleWare from '../middleware/auth.js'

const router = express.Router();
router.post('/clear', authMiddleWare, clearCart);
router.route('/')
    .get(authMiddleWare, getCart)
    .post(authMiddleWare, addToCart)

     router.route('/:id')
    .put(authMiddleWare, updateCartItem)
    .delete(authMiddleWare, deleteCartItem)

export default router;