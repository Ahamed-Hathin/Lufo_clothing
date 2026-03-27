import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Register = ({ onLogin }) => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/register', formData);
            localStorage.setItem('userToken', response.data.token);
            onLogin(response.data);
            navigate('/');
        } catch (err) {
            setError('Registration failed');
        }
    };
    return (
        <div className="card mx-auto mt-5 p-4 shadow-sm" style={{ maxWidth: '400px' }}>
            <h3 className="mb-4 text-center">Register</h3>
            {error && <div className="alert alert-danger py-2">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input className="form-control" type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input className="form-control" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input className="form-control" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Register Account</button>
            </form>
        </div>
    );
}

export default Register