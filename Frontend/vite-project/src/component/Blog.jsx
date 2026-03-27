import React from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
    // Dummy blog post data
    const posts = [
        {
            id: 1,
            title: "The Ultimate Guide to Fall Fashion 2026",
            excerpt: "Discover the highly anticipated trends coming this autumn. From warm earthy tones to layered styles, get ready to elevate your wardrobe.",
            image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
            date: "October 10, 2026",
            category: "Trends"
        },
        {
            id: 2,
            title: "How to Build a Timeless Capsule Wardrobe",
            excerpt: "A capsule wardrobe is the secret to stress-free mornings. Learn how to mix and match versatile pieces for endless elegant outfits.",
            image: "https://images.unsplash.com/photo-1550614000-4b95dd26cc65?q=80&w=2070&auto=format&fit=crop",
            date: "September 24, 2026",
            category: "Style Advice"
        },
        {
            id: 3,
            title: "Sustainable Fashion: Brands Leading the Way",
            excerpt: "Eco-friendly fashion is more important than ever. Here is an overview of the brands making an impact through sustainable practices.",
            image: "https://images.unsplash.com/photo-1434389678232-28df529c29af?q=80&w=2072&auto=format&fit=crop",
            date: "August 15, 2026",
            category: "Sustainability"
        }
    ];

    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <h1 className="fw-bolder display-4 mb-3" style={{ letterSpacing: '-1px' }}>The Lufo Clothing Blog</h1>
                <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
                    Stay instantly updated on elite style trends, fashion news, and exclusive drops.
                </p>
            </div>

            <div className="row">
                {posts.map(post => (
                    <div key={post.id} className="col-md-4 mb-4">
                        <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden" style={{ transition: 'transform 0.3s' }}>
                            <div className="position-relative">
                                <img src={post.image} className="card-img-top" alt={post.title} style={{ height: '220px', objectFit: 'cover' }} />
                                <span className="position-absolute top-0 start-0 m-3 badge bg-dark text-white p-2">
                                    {post.category}
                                </span>
                            </div>
                            <div className="card-body p-4 d-flex flex-column">
                                <small className="text-muted fw-bold mb-2">{post.date}</small>
                                <h5 className="card-title fw-bold mb-3">{post.title}</h5>
                                <p className="card-text text-secondary">{post.excerpt}</p>
                                <div className="mt-auto pt-3">
                                    <Link to="#" className="btn btn-outline-dark btn-sm rounded-pill px-4 fw-bold">Read More</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Newsletter Subscription */}
            <div className="bg-light p-5 rounded-4 mt-5 text-center shadow-sm">
                <h3 className="fw-bolder mb-3">Never Miss a Trend</h3>
                <p className="text-muted mb-4">Subscribe to our newsletter for the latest fashion news and exclusive offers.</p>
                <form className="d-flex justify-content-center mx-auto" style={{ maxWidth: '500px' }} onSubmit={(e) => { e.preventDefault(); alert("Subscribed!"); }}>
                    <input type="email" className="form-control form-control-lg rounded-start-pill shadow-none" placeholder="Enter your email" required />
                    <button type="submit" className="btn btn-dark btn-lg rounded-end-pill px-4 fw-bold shadow-none">Subscribe</button>
                </form>
            </div>
        </div>
    );
};

export default Blog;
