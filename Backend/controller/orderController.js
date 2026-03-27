import Order from '../modules/Order.js';
import Cart from '../modules/Cart.js';

const placeOrder = async (req, res) => {
    try {
        const { shippingAddress, couponCode } = req.body;
        
        // 1. Get User's Cart
        const cart = await Cart.findOne({ userId: req.userId }).populate('products.productId');
        
        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ success: false, message: 'Cart is empty' });
        }

        // 2. Calculate Total
        let totalAmount = 0;
        const orderItems = cart.products.map(item => {
            const price = item.productId.price;
            totalAmount += price * item.quantity;
            return {
                productId: item.productId._id,
                quantity: item.quantity,
                price: price
            };
        });

        // 3. Simple Coupon Logic
        let discount = 0;
        if (couponCode === 'SAVE10') {
            discount = totalAmount * 0.1; // 10% discount
        } else if (couponCode === 'SAVE20') {
            discount = totalAmount * 0.2; // 20% discount
        }

        const finalAmount = totalAmount - discount;

        // 4. Create Order
        const newOrder = await Order.create({
            userId: req.userId,
            items: orderItems,
            totalAmount,
            discount,
            finalAmount,
            shippingAddress,
            paymentStatus: 'Paid' // Simulating paid for simplicity
        });

        // 5. Clear Cart
        cart.products = [];
        await cart.save();

        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            order: newOrder
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to place order',
            error: error.message
        });
    }
};

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
        res.json({
            success: true,
            orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch orders',
            error: error.message
        });
    }
};

export { placeOrder, getMyOrders };
