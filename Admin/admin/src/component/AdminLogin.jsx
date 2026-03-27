import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ onLogin }) => {

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('/auth/login', formData);

            if (response.data.role === 'admin') {
                onLogin(response.data);
                navigate('/');
            } else {
                setError('Access denied. Admin credentials required.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-md-6 col-lg-4">
                <div className="card shadow border-0">
                    <div className="card-body p-4">
                        <h3 className="text-center mb-4">Admin Login</h3>
                        {error && <div className="alert alert-danger p-2">{error}</div>}
                        
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    required 
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="btn btn-primary w-100 mt-2"
                                disabled={loading}
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin