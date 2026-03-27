import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [wishlist, setWishlist] = useState([]);
    const [cartMessage, setCartMessage] = useState('');
    const [selectedSize, setSelectedSize] = useState('M');

    useEffect(() => {
        fetchProduct();
        fetchWishlist();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`/product/${id}`);
            if (response.data.success) {
                setProduct(response.data.product);
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

    const toggleWishlist = async () => {
        try {
            const response = await axios.post('/auth/wishlist/toggle', { productId: product._id });
            if (response.data.success) {
                setWishlist(response.data.wishlist.map(item => item._id));
            }
        } catch (err) {
            alert('Please login to use wishlist');
        }
    };

    const addToCart = async () => {
        try {
            const response = await axios.post('/cart/add', { productId: product._id, quantity: 1 });
            if (response.data.success) {
                setCartMessage('✅ Added to cart!');
                setTimeout(() => setCartMessage(''), 2000);
            }
        } catch (err) {
            alert('Please login to add to cart');
        }
    };

    if (loading) return <div className="text-center py-5 mt-5"><h4>Loading...</h4></div>;
    if (!product) return <div className="text-center py-5 mt-5"><h4>Product not found</h4></div>;

    return (
        <div className="container mt-5">
            {cartMessage && <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1100 }}>
                <div className="toast show bg-dark text-white rounded-3 shadow-lg p-2 px-4">{cartMessage}</div>
            </div>}

            <nav aria-label="breadcrumb" className="mb-4">
                <ol className="breadcrumb small">
                    <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-muted">Home</Link></li>
                    <li className="breadcrumb-item active text-capitalize">{product.category}</li>
                    <li className="breadcrumb-item active">{product.name}</li>
                </ol>
            </nav>

            <div className="row g-5">
                <div className="col-md-6">
                    <div className="rounded-4 overflow-hidden bg-light shadow-sm">
                        <img 
                            src={product.image?.startsWith('http') ? product.image : `http://localhost:5000/uploads/${product.image}`} 
                            className="img-fluid w-100 p-5" 
                            alt={product.name} 
                            style={{ maxHeight: '600px', objectFit: 'contain' }} 
                        />
                    </div>
                </div>
                
                <div className="col-md-6">
                    <h2 className="fw-bold mb-1">{product.name}</h2>
                    <p className="text-muted mb-3 fs-5">Premium Collection</p>
                    
                    <div className="d-flex align-items-center gap-3 mb-4">
                        <h2 className="fw-bold text-dark mb-0">${product.price}</h2>
                        <span className="text-muted text-decoration-line-through">${Math.round(product.price * 1.5)}</span>
                        <span className="text-warning fw-bold">(33% OFF)</span>
                    </div>

                    <p className="text-success fw-bold small mb-4">Inclusive of all taxes</p>

                    <div className="mb-4">
                        <h6 className="fw-bold text-uppercase small mb-3">Select Size</h6>
                        <div className="d-flex gap-2">
                            {['S', 'M', 'L', 'XL'].map(size => (
                                <button 
                                    key={size} 
                                    className={`btn rounded-circle fw-bold ${selectedSize === size ? 'btn-dark' : 'btn-outline-dark'}`}
                                    style={{ width: '45px', height: '45px', fontSize: '12px' }}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="d-grid gap-3 d-md-flex mb-5">
                        <button className="btn btn-dark rounded-pill px-5 py-3 fw-bold flex-grow-1" onClick={addToCart}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-bag-fill me-2" viewBox="0 0 16 16"><path d="M8 1a2 2 0 0 0-2 2v2H5V3a3 3 0 1 1 6 0v2h-1V3a2 2 0 0 0-2-2zM5 5H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11v1.5a.5.5 0 0 1-1 0V5H6v1.5a.5.5 0 0 1-1 0V5z"/></svg>
                            Add to Bag
                        </button>
                        <button className={`btn rounded-pill px-4 py-3 fw-bold border-1 ${wishlist.includes(product._id) ? 'btn-danger border-danger' : 'btn-outline-dark'}`} onClick={toggleWishlist}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-heart-fill me-2" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/></svg>
                            {wishlist.includes(product._id) ? 'Wishlisted' : 'Wishlist'}
                        </button>
                    </div>

                    <div className="border-top pt-4">
                        <h6 className="fw-bold text-uppercase small mb-3">Product Description</h6>
                        <p className="text-muted small lh-lg mb-0">{product.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
