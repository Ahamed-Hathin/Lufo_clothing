// src/components/Cart.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
    const [cart, setCart] = useState({ products: [] });
    const [loading, setLoading] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await axios.get('/cart');
            if (response.data.success) {
                setCart(response.data.cart);
            }
        } catch (err) {
            console.error('Failed to fetch cart:', err);
        }
    };

    const updateQuantity = async (productId, newQuantity) => {
        try {
            const response = await axios.post(`/cart/update/${productId}`, { quantity: newQuantity });
            if (response.data.success) {
                setCart(response.data.cart);
            }
        } catch (err) {}
    };

    const removeItem = async (productId) => {
        if (!window.confirm('Remove item?')) return;
        try {
            const response = await axios.delete(`/cart/remove/${productId}`);
            if (response.data.success) {
                setCart(response.data.cart);
            }
        } catch (err) {}
    };

    const applyCoupon = () => {
        if (couponCode === 'SAVE10') {
            setDiscount(subtotal * 0.1);
            alert('10% discount applied!');
        } else if (couponCode === 'SAVE20') {
            setDiscount(subtotal * 0.2);
            alert('20% discount applied!');
        } else {
            alert('Invalid coupon code');
            setDiscount(0);
        }
    };

    const handleCheckout = async () => {
        if (!shippingAddress) return alert('Please enter shipping address');
        setLoading(true);
        try {
            const response = await axios.post('/order/place', { 
                shippingAddress, 
                couponCode 
            });
            if (response.data.success) {
                alert('🎉 Order placed successfully!');
                window.location.href = '/orders';
            }
        } catch (err) {
            alert('Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    const subtotal = cart.products.reduce((sum, item) => sum + (item.productId?.price || 0) * item.quantity, 0);
    const total = subtotal - discount;

    return (
        <div className="container mt-4">
            <h2 className="mb-5 fw-bold">Shopping Bag</h2>
            
            {(!cart.products || cart.products.length === 0) ? (
                <div className="text-center py-5 shadow-sm rounded-4 bg-white">
                    <p className="lead">Your bag is empty.</p>
                    <a href="/" className="btn btn-dark rounded-pill px-5 py-2 fw-bold mt-3">Start Shopping</a>
                </div>
            ) : (
                <div className="row g-5">
                    {/* Left Side: Items */}
                    <div className="col-lg-8">
                        {cart.products.map(item => (
                            <div key={item.productId?._id} className="card border-0 border-bottom rounded-0 pb-4 mb-4">
                                <div className="row g-4 align-items-center">
                                    <div className="col-3 col-md-2">
                                        <img src={item.productId?.image} alt={item.productId?.name} className="img-fluid rounded-3 bg-light p-2" />
                                    </div>
                                    <div className="col-9 col-md-10">
                                        <div className="d-flex justify-content-between align-items-start">
                                            <div>
                                                <h6 className="fw-bold mb-1">{item.productId?.name}</h6>
                                                <p className="text-muted small mb-2">Category: {item.productId?.category}</p>
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="input-group input-group-sm" style={{ width: '100px' }}>
                                                        <button className="btn btn-outline-dark border-0 bg-light" onClick={() => updateQuantity(item.productId?._id, Math.max(1, item.quantity - 1))}>-</button>
                                                        <span className="form-control text-center border-0 bg-light">{item.quantity}</span>
                                                        <button className="btn btn-outline-dark border-0 bg-light" onClick={() => updateQuantity(item.productId?._id, item.quantity + 1)}>+</button>
                                                    </div>
                                                    <button className="btn btn-link text-danger p-0 small text-decoration-none" onClick={() => removeItem(item.productId?._id)}>Remove</button>
                                                </div>
                                            </div>
                                            <div className="text-end">
                                                <p className="fw-bold mb-0">${(item.productId?.price || 0) * item.quantity}</p>
                                                <small className="text-muted">${item.productId?.price} per unit</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Side: Summary */}
                    <div className="col-lg-4">
                        <div className="card shadow-sm border-0 rounded-4 p-4 sticky-top" style={{ top: '100px' }}>
                            <h5 className="fw-bold mb-4">Order Summary</h5>
                            
                            <div className="mb-4">
                                <label className="form-label small fw-bold text-uppercase text-muted">Shipping Address</label>
                                <textarea 
                                    className="form-control rounded-3 border-0 bg-light p-3" 
                                    rows="3" 
                                    placeholder="Enter your full address..."
                                    value={shippingAddress}
                                    onChange={(e) => setShippingAddress(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="mb-4">
                                <label className="form-label small fw-bold text-uppercase text-muted">Apply Coupon</label>
                                <div className="input-group">
                                    <input 
                                        type="text" 
                                        className="form-control border-0 bg-light rounded-start-3" 
                                        placeholder="SAVE10, SAVE20"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                    />
                                    <button className="btn btn-dark rounded-end-3 px-3" onClick={applyCoupon}>Apply</button>
                                </div>
                                <small className="text-muted mt-1 d-block">Try SAVE10 or SAVE20</small>
                            </div>

                            <hr className="my-4" />

                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted">Subtotal</span>
                                <span className="fw-bold">${subtotal.toFixed(2)}</span>
                            </div>
                            {discount > 0 && <div className="d-flex justify-content-between mb-2 text-success">
                                <span>Discount</span>
                                <span>-${discount.toFixed(2)}</span>
                            </div>}
                            <div className="d-flex justify-content-between mb-4">
                                <span className="text-muted">Shipping</span>
                                <span className="text-success fw-bold">FREE</span>
                            </div>

                            <div className="d-flex justify-content-between mb-4 pt-3 border-top">
                                <h5 className="fw-bold">Total</h5>
                                <h5 className="fw-bold text-danger">${total.toFixed(2)}</h5>
                            </div>

                            <button className="btn btn-dark w-100 rounded-pill py-3 fw-bold" onClick={handleCheckout} disabled={loading}>
                                {loading ? 'Processing...' : 'Place Order'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;