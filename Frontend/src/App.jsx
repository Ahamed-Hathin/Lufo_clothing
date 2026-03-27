import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './component/Login';
import Register from './component/Register';
import User from './component/User';
import Cart from './component/Cart';
import ProductDetails from './component/ProductDetails';
import MenPage from './component/MenPage';
import WomenPage from './component/WomenPage';
import AccessoriesPage from './component/AccessoriesPage';
import About from './component/About';
import Blog from './component/Blog';
import Contact from './component/Contact';

import Wishlist from './component/Wishlist';
import OrderHistory from './component/OrderHistory';

axios.defaults.baseURL = 'https://lufo-clothing.onrender.com';

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userData')) || null);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const onLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top py-3 shadow-sm border-bottom">
        <div className="container">
          <Link className="navbar-brand fw-bold fs-3" to="/" style={{ letterSpacing: '-1.5px' }}>
            LUFO<span className="text-warning">.</span>
          </Link>

          <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto fw-semibold text-uppercase" style={{ fontSize: '0.85rem', letterSpacing: '1px' }}>
              <li className="nav-item"><Link className="nav-link px-3" to="/">Shop</Link></li>
              <li className="nav-item"><Link className="nav-link px-3" to="/men">Men</Link></li>
              <li className="nav-item"><Link className="nav-link px-3" to="/women">Women</Link></li>
              <li className="nav-item"><Link className="nav-link px-3" to="/about">About</Link></li>
              <li className="nav-item"><Link className="nav-link px-3" to="/contact">Contact</Link></li>
            </ul>

            <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
              <div className="position-relative d-none d-md-block">
                <input
                  className="form-control rounded-pill border-0 bg-light ps-4 pe-5"
                  type="search"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: '200px' }}
                />
                <i className="bi bi-search position-absolute top-50 end-0 translate-middle-y me-3 text-muted"></i>
              </div>

              <Link className="text-dark position-relative" to="/wishlist">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16"><path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" /></svg>
              </Link>

              <Link className="text-dark position-relative" to="/cart">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16"><path d="M8 1a2 2 0 0 1 2 2v2H6V3a2 2 0 0 1 2-2zm3 4V3a3 3 0 1 0-6 0v2H2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3zM2 6h12v6H2V6z" /></svg>
              </Link>

              {user ? (
                <div className="dropdown">
                  <button className="btn btn-link text-dark p-0 dropdown-toggle no-caret" type="button" data-bs-toggle="dropdown">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" /></svg>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end border-0 shadow-lg mt-2 p-2">
                    <li><h6 className="dropdown-header">Hi, {user.name}</h6></li>
                    <li><Link className="dropdown-item rounded-2" to="/orders">Order History</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item text-danger rounded-2" onClick={handleLogout}>Logout</button></li>
                  </ul>
                </div>
              ) : (
                <Link className="btn btn-dark btn-sm rounded-pill px-4 fw-bold" to="/login">Login</Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="container py-4">
        <Routes>
          <Route path="/" element={<User searchTerm={searchTerm} category={category} setCategory={setCategory} />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/men" element={<MenPage searchTerm={searchTerm} />} />
          <Route path="/women" element={<WomenPage searchTerm={searchTerm} />} />
          <Route path="/accessories" element={<AccessoriesPage searchTerm={searchTerm} />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={user ? <Cart /> : <Login onLogin={onLogin} />} />
          <Route path="/wishlist" element={user ? <Wishlist /> : <Login onLogin={onLogin} />} />
          <Route path="/orders" element={user ? <OrderHistory /> : <Login onLogin={onLogin} />} />
          <Route path="/login" element={<Login onLogin={onLogin} />} />
          <Route path="/register" element={<Register onLogin={onLogin} />} />
        </Routes>
      </div>

      {/* Simplified Footer Section */}
      <footer className="bg-dark text-white pt-5 pb-4 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-3">
              <h5 className="text-uppercase fw-bold">About Us</h5>
              <p>Your ultimate destination for premium men's and women's clothing.</p>
            </div>
            <div className="col-md-4 mb-3">
              <h5 className="text-uppercase fw-bold">Quick Links</h5>
              <ul className="list-unstyled">
                <li><Link to="/" className="text-white text-decoration-none">Home</Link></li>
                <li><Link to="/about" className="text-white text-decoration-none">About</Link></li>
                <li><Link to="/blog" className="text-white text-decoration-none">Blog</Link></li>
                <li><Link to="/contact" className="text-white text-decoration-none">Contact</Link></li>
                <li><Link to="/cart" className="text-white text-decoration-none">Cart</Link></li>
              </ul>
            </div>
            <div className="col-md-4 mb-3">
              <h5 className="text-uppercase fw-bold">Contact Info</h5>
              <p>Email: support@lufoclothing.com<br />Phone: 8270223203</p>
            </div>
          </div>
        </div>
      </footer>
    </Router>
  );
}

export default App;