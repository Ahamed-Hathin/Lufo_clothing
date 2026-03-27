import { Router } from "express";
const router = Router();
import {getCart, addToCart, updateCartItem,  removeFromCart,  clearCart} from '../controller/cart.js'
import {verifyToken} from '../middleware/authMiddleware.js'

router.get('/', verifyToken, getCart)
router.post('/add', verifyToken, addToCart)
router.post('/update/:productId', verifyToken, updateCartItem)
router.delete('/remove/:productId', verifyToken, removeFromCart)
router.delete('/clear', verifyToken, clearCart)

export default router