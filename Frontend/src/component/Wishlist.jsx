import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        try {
            const response = await axios.get('/auth/wishlist');
            if (response.data.success) {
                setWishlist(response.data.wishlist);
            }
        } catch (err) {
            console.error('Error fetching wishlist:', err);
        } finally {
            setLoading(false);
        }
    };

    const removeFromWishlist = async (productId) => {
        try {
            const response = await axios.post('/auth/wishlist/toggle', { productId });
            if (response.data.success) {
                setWishlist(wishlist.filter(item => item._id !== productId));
            }
        } catch (err) {
            console.error('Error removing from wishlist:', err);
        }
    };

    const addToCart = async (productId) => {
        try {
            await axios.post('/cart/add', { productId, quantity: 1 });
            alert('Added to cart!');
        } catch (err) {
            console.error('Add to cart error:', err);
        }
    };

    if (loading) return <div className="text-center mt-5"><h4>Loading Wishlist...</h4></div>;

    return (
        <div className="container mt-5">
            <h2 className="mb-4 fw-bold">My Wishlist ({wishlist.length})</h2>
            {wishlist.length === 0 ? (
                <div className="text-center py-5">
                    <p className="lead">Your wishlist is empty.</p>
                    <Link to="/" className="btn btn-dark rounded-pill px-4">Start Shopping</Link>
                </div>
            ) : (
                <div className="row">
                    {wishlist.map(product => (
                        <div key={product._id} className="col-md-3 mb-4">
                            <div className="card product-card h-100 shadow-sm transition-all">
                                <div className="img-container">
                                    <Link to={`/product/${product._id}`}>
                                        <img 
                                            src={product.image?.startsWith('http') ? product.image : `http://localhost:5000/uploads/${product.image}`} 
                                            className="product-img" 
                                            alt={product.name} 
                                        />
                                    </Link>
                                    <button 
                                        className="btn btn-white rounded-circle position-absolute top-0 end-0 m-3 shadow-sm border-0 d-flex align-items-center justify-content-center"
                                        onClick={() => removeFromWishlist(product._id)}
                                        style={{ width: '38px', height: '38px', background: 'white', zIndex: 10 }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#ff4757" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                                        </svg>
                                    </button>
                                </div>
                                <div className="card-body">
                                    <p className="product-category mb-1">{product.category || 'Collection'}</p>
                                    <Link to={`/product/${product._id}`} className="text-decoration-none">
                                        <h6 className="product-title">{product.name}</h6>
                                    </Link>
                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <span className="product-price">${product.price}</span>
                                        <button className="btn btn-dark add-btn btn-sm" onClick={() => addToCart(product._id)}>
                                            Add +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
