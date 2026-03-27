import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('/order/myorders');
            if (response.data.success) {
                setOrders(response.data.orders);
            }
        } catch (err) {
            console.error('Error fetching orders:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center mt-5"><h4>Loading Order History...</h4></div>;

    return (
        <div className="container mt-5">
            <h2 className="mb-4 fw-bold">My Order History ({orders.length})</h2>
            {orders.length === 0 ? (
                <div className="text-center py-5">
                    <p className="lead">You haven't placed any orders yet.</p>
                </div>
            ) : (
                <div className="row">
                    {orders.map(order => (
                        <div key={order._id} className="col-md-12 mb-4">
                            <div className="card border-0 shadow-sm rounded-4 p-4">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div>
                                        <h6 className="fw-bolder mb-1">Order ID: #{order._id.substring(0, 8)}...</h6>
                                        <p className="text-muted small mb-0">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <span className={`badge ${order.status === 'Delivered' ? 'bg-success' : 'bg-warning text-dark'} px-3 py-2 rounded-pill`}>
                                        {order.status}
                                    </span>
                                </div>
                                <hr />
                                <div className="mb-3">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="small mb-1 d-flex justify-content-between">
                                            <span>Product ID: {item.productId.substring(0, 8)}... x {item.quantity}</span>
                                            <span>${item.price * item.quantity}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="d-flex justify-content-between fw-bold pt-2 border-top">
                                    <span>Total:</span>
                                    <span className="text-danger">${order.finalAmount}</span>
                                </div>
                                <div className="mt-3 small text-muted">Shipped to: {order.shippingAddress}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
