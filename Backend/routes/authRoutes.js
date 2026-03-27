import { Router } from "express";
const router = Router();
import {register, login, getMe, toggleWishlist, getWishlist} from '../controller/authController.js'
import {verifyToken} from '../middleware/authMiddleware.js'

router.post('/register', register)
router.post('/login', login)
router.post('/me', verifyToken, getMe)
router.post('/wishlist/toggle', verifyToken, toggleWishlist)
router.get('/wishlist', verifyToken, getWishlist)

export default router
 