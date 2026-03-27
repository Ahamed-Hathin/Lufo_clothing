import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="container py-5">
            {/* Header Section */}
            <div className="text-center mb-5">
                <h1 className="fw-bolder display-4 mb-3" style={{ letterSpacing: '-1px' }}>About Lufo Clothing.</h1>
                <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
                    We are dedicated to bringing you the most premium and trendy fashion collections. Experience style, comfort, and quality like never before.
                </p>
            </div>

            {/* Content Section */}
            <div className="row align-items-center mb-5">
                <div className="col-md-6 mb-4 mb-md-0">
                    <img 
                        src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop" 
                        alt="Our Store" 
                        className="img-fluid rounded-4 shadow-lg"
                        style={{ objectFit: 'cover', height: '400px', width: '100%' }}
                    />
                </div>
                <div className="col-md-6 ps-md-5">
                    <h2 className="fw-bold mb-4">Our Story</h2>
                    <p className="text-secondary fs-5 lh-base">
                        Founded with a passion for high-end fashion, Lufo Clothing started as a small boutique and has grown into a premier destination for trendsetters worldwide.
                    </p>
                    <p className="text-secondary fs-5 lh-base mb-4">
                        We believe that what you wear is an expression of who you are. That's why we carefully curate every piece in our Men's and Women's collections to ensure it meets our strict standards of elegance and durability.
                    </p>
                    <Link to="/" className="btn btn-dark btn-lg px-4 rounded-pill fw-bold">
                        Shop Now
                    </Link>
                </div>
            </div>

            {/* Features Section */}
            <div className="row text-center mt-5 pt-4 border-top">
                <div className="col-md-4 mb-4">
                    <i className="bi bi-truck fs-1 text-warning mb-3 d-block"></i>
                    <h4 className="fw-bold">Fast Delivery</h4>
                    <p className="text-muted">Get your fashion delivered right to your doorstep quickly and safely.</p>
                </div>
                <div className="col-md-4 mb-4">
                    <i className="bi bi-star-fill fs-1 text-warning mb-3 d-block"></i>
                    <h4 className="fw-bold">Premium Quality</h4>
                    <p className="text-muted">Every item is crafted using top-tier materials for lasting wear.</p>
                </div>
                <div className="col-md-4 mb-4">
                    <i className="bi bi-headset fs-1 text-warning mb-3 d-block"></i>
                    <h4 className="fw-bold">24/7 Support</h4>
                    <p className="text-muted">Our customer service team is always here to assist you with any questions.</p>
                </div>
            </div>
        </div>
    );
};

export default About;
