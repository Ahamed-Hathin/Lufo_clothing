import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import AdminLogin from './component/AdminLogin';
import AdminDashBoard from './component/AdminDashBoard';
import ProductList from './component/ProductList';

axios.defaults.baseURL = 'http://localhost:5000'

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminRole');
      localStorage.removeItem('adminName');
      window.location.href = '/login';
    }
    return Promise.reject(error); // always re-throw so catch blocks in components fire
  }
);

function App() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const role = localStorage.getItem('adminRole');
    const name = localStorage.getItem('adminName');

    if (token && role === 'admin') {
      setAdmin({ token, role, name });
    }
    setLoading(false);
  }, []);

  const handleLogin = (adminData) => {
    setAdmin(adminData);
    localStorage.setItem('adminToken', adminData.token);
    localStorage.setItem('adminRole', adminData.role);
    localStorage.setItem('adminName', adminData.name);
  };

  const handleLogout = () => {
    setAdmin(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminRole');
    localStorage.removeItem('adminName');
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        color: 'white',
        fontSize: '20px'
      }}>
        Loading...
      </div>
    );
  }





  return (
    <Router>
      <div className="container mt-4">
        {admin && (
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 px-3 rounded shadow-sm">
            <Link className="navbar-brand fw-bold" to="/">Admin Panel</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Dashboard Add Product</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/products">Manage Products</Link>
                </li>
              </ul>
              <button className="btn btn-danger btn-sm" onClick={handleLogout}>Logout</button>
            </div>
          </nav>
        )}
        <Routes>
          <Route path="/login" element={!admin ? <AdminLogin onLogin={handleLogin} /> : <Navigate to="/" />} />
          <Route path="/" element={admin ? <AdminDashBoard /> : <Navigate to="/login" />} />
          <Route path="/products" element={admin ? <ProductList /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
