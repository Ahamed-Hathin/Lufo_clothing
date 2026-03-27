import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MenPage = ({ searchTerm = "" }) => {
    const [products, setProducts] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cartMessage, setCartMessage] = useState('');

    useEffect(() => {
        fetchMenProducts();
        fetchWishlist();
    }, []);

    const fetchMenProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/product/men');
            if (response.data.success) {
                setProducts(response.data.products || []);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchWishlist = async () => {
        try {
            const response = await axios.get('/auth/wishlist');
            if (response.data.success) {
                setWishlist(response.data.wishlist.map(item => item._id));
            }
        } catch (err) {}
    };

    const toggleWishlist = async (productId) => {
        try {
            const response = await axios.post('/auth/wishlist/toggle', { productId });
            if (response.data.success) {
                setWishlist(response.data.wishlist.map(item => item._id));
            }
        } catch (err) {
            alert('Please login to use wishlist');
        }
    };

    const addToCart = async (productId) => {
        try {
            const response = await axios.post('/cart/add', { productId, quantity: 1 });
            if (response.data.success) {
                setCartMessage('✅ Added to cart!');
                setTimeout(() => setCartMessage(''), 2000);
            }
        } catch (err) {
            alert('Please login to add to cart');
        }
    };

    if (loading) return <div className="text-center py-5"><h4>Loading...</h4></div>;

    const filtered = products.filter(p =>
        (p.name || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="text-white text-center py-5 mb-5 rounded-4 shadow-sm"
                style={{ background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)' }}>
                <h1 className="fw-bolder display-4 mb-2">Men's Wardrobe</h1>
                <p className="lead opacity-75">Premium essentials for the modern man</p>
            </div>

            {cartMessage && <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1100 }}>
                <div className="toast show bg-dark text-white rounded-3 shadow-lg p-2 px-4 text-center">{cartMessage}</div>
            </div>}

            <div className="row">
                {filtered.length > 0 ? filtered.map(product => (
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
                                    onClick={() => toggleWishlist(product._id)}
                                    style={{ width: '38px', height: '38px', background: 'white', zIndex: 10 }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill={wishlist.includes(product._id) ? "#ff4757" : "currentColor"} className="bi bi-heart-fill" viewBox="0 0 16 16">
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
                )) : (
                    <div className="text-center py-5">
                        <p className="lead">No products found for Men.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MenPage;
