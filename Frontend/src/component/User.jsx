import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Dummy data removed; using live products instead

const User = ({ searchTerm = "" }) => {
    const [products, setProducts] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cartMessage, setCartMessage] = useState('');

    useEffect(() => {
        fetchProducts();
        fetchWishlist();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/product');
            if (response.data.success) {
                setProducts(response.data.products || []);
            }
        } catch (err) {
            console.error('Failed to fetch products:', err);
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
                setCartMessage('✅ Hero! Item added to bag.');
                setTimeout(() => setCartMessage(''), 2500);
            }
        } catch (err) {
            alert('Please login to add to cart');
        }
    };

    const filtered = products.filter(p =>
        (p.name || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const categories = [
        { name: 'Men Fashion', img: '/assets/men.png', path: '/men', desc: 'Stylish & Modern' },
        { name: 'Women Fashion', img: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&q=80', path: '/women', desc: 'Elegant & Chic' },
        { name: 'Accessories', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80', path: '/accessories', desc: 'Premium Accessories' },
    ];

    if (loading) return <div className="text-center py-5 mt-5"><h4>Crafting your shopping experience...</h4></div>;

    return (
        <div className="landing-page">
            {/* 1. Hero Section */}
            <section className="hero-section position-relative py-5 mb-5 rounded-5 overflow-hidden shadow-lg mx-md-0" 
                style={{ 
                    background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url("/assets/hero.png") top center/cover no-repeat', 
                    minHeight: '550px',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                <div className="container text-white py-5">
                    <div className="col-md-8 col-lg-6">
                        <span className="badge bg-danger rounded-pill px-3 py-2 mb-3 fw-bold text-uppercase tracking-wider">New Arrival 2026</span>
                        <h1 className="display-2 fw-black mb-3">Upgrade Your <br /> Personal Style</h1>
                        <p className="lead mb-5 opacity-90 fs-4">Explore the handpicked collection of premium apparel and accessories. Minimalist design, maximum comfort.</p>
                        <div className="d-flex gap-3">
                            <a href="#featured" className="btn btn-light btn-lg rounded-pill px-5 py-3 fw-bold shadow hover-up transition-all">Shop Now</a>
                            <Link to="/about" className="btn btn-outline-light btn-lg rounded-pill px-5 py-3 fw-bold hover-up transition-all">Learn More</Link>
                        </div>
                    </div>
                </div>
            </section>

            {cartMessage && <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1100 }}>
                <div className="toast show bg-dark text-white rounded-4 shadow-lg p-3 px-4 text-center">{cartMessage}</div>
            </div>}

            {/* 2. Categories Section */}
            <section className="py-5 mb-5">
                <div className="container">
                    <div className="text-center mb-5">
                        <h6 className="text-danger fw-bold text-uppercase small tracking-widest mb-2">Collections</h6>
                        <h2 className="display-5 fw-bold text-dark">Shop By Category</h2>
                    </div>
                    <div className="row g-4 justify-content-center">
                        {categories.map((cat, i) => (
                            <div key={i} className="col-md-4">
                                <Link to={cat.path} className="text-decoration-none group card border-0 h-100 shadow-sm rounded-4 overflow-hidden position-relative hover-up transition-all">
                                    <div className="overflow-hidden" style={{ height: '350px' }}>
                                        <img src={cat.img} className="img-fluid w-100 h-100 transition-5" alt={cat.name} style={{ objectFit: 'cover' }} />
                                    </div>
                                    <div className="position-absolute bottom-0 start-0 p-4 w-100 bg-gradient-dark-transparent text-white pt-5">
                                        <h4 className="fw-black mb-1">{cat.name}</h4>
                                        <p className="small mb-0 opacity-75">{cat.desc}</p>
                                        <div className="mt-3 fs-3 transition-grow opacity-0 group-hover-opacity-100">&rarr;</div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Featured Products */}
            <section id="featured" className="py-5 bg-white rounded-5 mb-5 shadow-sm">
                <div className="container">
                    <div className="d-flex align-items-end justify-content-between mb-5">
                        <div>
                            <h2 className="display-5 fw-bold mb-0">Featured Products</h2>
                            <p className="text-muted mb-0">Handpicked items for the season</p>
                        </div>
                        <Link to="/" className="btn btn-link text-dark fw-bold text-decoration-none border-bottom border-dark border-2 px-0 pb-1">View All</Link>
                    </div>
                    
                    <div className="row g-4">
                        {filtered.slice(0, 8).map(product => (
                            <div key={product._id} className="col-6 col-md-4 col-lg-3">
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
                                            style={{ width: '36px', height: '36px', background: 'white', zIndex: 10 }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={wishlist.includes(product._id) ? "#ff4757" : "currentColor"} className="bi bi-heart-fill" viewBox="0 0 16 16">
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
                </div>
            </section>

            {/* 4. Offer / Discount Banner */}
            <section className="py-5 container mb-5">
                <div className="p-5 rounded-5 shadow-xl text-white text-center d-flex flex-column align-items-center justify-content-center" 
                    style={{ background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/assets/hero.png") top center/cover no-repeat', minHeight: '350px' }}>
                    <h2 className="display-4 fw-black mb-2">Flat 20% Off Everything</h2>
                    <p className="lead mb-4 fw-bold">Upgrade your wardrobe today with our biggest sale.</p>
                    <button className="btn btn-danger btn-lg rounded-pill px-5 py-3 fw-bold shadow-lg hover-up transition-all">Grab Deal Now</button>
                </div>
            </section>

            {/* 5. Why Choose Us Section */}
            <section className="py-5 mb-5 bg-light-soft rounded-5">
                <div className="container py-4">
                    <div className="row g-5 text-center">
                        <div className="col-md-4">
                            <div className="p-4">
                                <div className="bg-white rounded-circle shadow-sm p-4 d-inline-block mb-4 fs-1">🚚</div>
                                <h5 className="fw-black mb-2">Free Delivery</h5>
                                <p className="text-muted mb-0">Fast and free shipping on all orders over $150.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-4">
                                <div className="bg-white rounded-circle shadow-sm p-4 d-inline-block mb-4 fs-1">🔄</div>
                                <h5 className="fw-black mb-2">Easy Returns</h5>
                                <p className="text-muted mb-0">Hassle-free 30-day exchange and return policy.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-4">
                                <div className="bg-white rounded-circle shadow-sm p-4 d-inline-block mb-4 fs-1">🔒</div>
                                <h5 className="fw-black mb-2">Secure Payments</h5>
                                <p className="text-muted mb-0">All transactions are encrypted and 100% secure.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Testimonials */}
            <section className="py-5 container mb-5">
                <div className="text-center mb-5">
                    <h2 className="display-5 fw-black text-dark">Our Reviews</h2>
                    <p className="text-muted">What our users say about Lufo Clothing</p>
                </div>
                <div className="row g-4 justify-content-center">
                    <div className="col-md-5 col-lg-4">
                        <div className="card border-0 shadow-sm rounded-left-5 rounded-right-2 p-5 h-100 bg-white border-start border-danger border-5">
                            <div className="d-flex align-items-center mb-4">
                                <img src="https://i.pravatar.cc/100?u=1" className="rounded-circle me-3 shadow-sm" width="55" alt="user" />
                                <div>
                                    <h6 className="fw-bold mb-0">Sarah Wilson</h6>
                                    <small className="text-muted">Lifestyle Influencer</small>
                                </div>
                            </div>
                            <p className="fst-italic opacity-85 fs-5">"The quality of the fabric is just outstanding. It feels premium and looks even better in person!"</p>
                        </div>
                    </div>
                    <div className="col-md-5 col-lg-4">
                        <div className="card border-0 shadow-sm rounded-left-5 rounded-right-2 p-5 h-100 bg-white border-start border-primary border-5">
                            <div className="d-flex align-items-center mb-4">
                                <img src="https://i.pravatar.cc/100?u=2" className="rounded-circle me-3 shadow-sm" width="55" alt="user" />
                                <div>
                                    <h6 className="fw-bold mb-0">David Chen</h6>
                                    <small className="text-muted">Tech Entrepreneur</small>
                                </div>
                            </div>
                            <p className="fst-italic opacity-85 fs-5">"Great customer support and very slick interface. Shopping here is always a breeze."</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default User;