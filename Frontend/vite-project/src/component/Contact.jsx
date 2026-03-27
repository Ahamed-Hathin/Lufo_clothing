import React, { useState } from 'react';

const Contact = () => {
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('Message sent successfully! We will get back to you shortly.');
        e.target.reset();
        setTimeout(() => setStatus(''), 5000);
    };

    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <h1 className="fw-bolder display-4 mb-3" style={{ letterSpacing: '-1px' }}>Contact Us.</h1>
                <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
                    Have a question, feedback, or need assistance? We're here to help. Reach out to the Lufo Clothing support team.
                </p>
            </div>

            <div className="row justify-content-center">
                <div className="col-lg-5 mb-5 mb-lg-0">
                    <div className="bg-light p-5 rounded-4 shadow-sm h-100">
                        <h4 className="fw-bold mb-4">Get In Touch</h4>
                        
                        <div className="d-flex align-items-start mb-4">
                            <i className="bi bi-geo-alt fs-3 text-warning me-3"></i>
                            <div>
                                <h6 className="fw-bold mb-1">Our Location</h6>
                                <p className="text-muted mb-0">Trichy inamKulathur<br/>Tamil Nadu<br/>India</p>
                            </div>
                        </div>
                        
                        <div className="d-flex align-items-start mb-4">
                            <i className="bi bi-telephone fs-3 text-warning me-3"></i>
                            <div>
                                <h6 className="fw-bold mb-1">Phone Number</h6>
                                <p className="text-muted mb-0">8270223203<br/>Mon-Fri 9am-6pm IST</p>
                            </div>
                        </div>

                        <div className="d-flex align-items-start">
                            <i className="bi bi-envelope fs-3 text-warning me-3"></i>
                            <div>
                                <h6 className="fw-bold mb-1">Email Address</h6>
                                <p className="text-muted mb-0">support@lufoclothing.com<br/>careers@lufoclothing.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-7">
                    <div className="bg-white p-5 rounded-4 shadow-sm border h-100">
                        <h4 className="fw-bold mb-4">Send Us a Message</h4>
                        {status && (
                            <div className="alert alert-success py-2 d-flex align-items-center">
                                <i className="bi bi-check-circle-fill me-2 fs-5"></i>
                                {status}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-bold text-muted small">First Name</label>
                                    <input type="text" className="form-control form-control-lg bg-light rounded-3 shadow-none border-0" required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-bold text-muted small">Last Name</label>
                                    <input type="text" className="form-control form-control-lg bg-light rounded-3 shadow-none border-0" required />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold text-muted small">Email Address</label>
                                <input type="email" className="form-control form-control-lg bg-light rounded-3 shadow-none border-0" required />
                            </div>
                            <div className="mb-4">
                                <label className="form-label fw-bold text-muted small">Message</label>
                                <textarea className="form-control form-control-lg bg-light rounded-3 shadow-none border-0" rows="5" required></textarea>
                            </div>
                            <button type="submit" className="btn btn-dark btn-lg w-100 rounded-pill fw-bold shadow-none">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
