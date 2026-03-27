import express from 'express';
import { placeOrder, getMyOrders } from '../controller/orderController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Order routes
router.post('/place', verifyToken, placeOrder);
router.get('/myorders', verifyToken, getMyOrders);

export default router;
