import React, { useState } from 'react';
import axios from 'axios';

const AdminDashBoard = () => {
    const [product, setProduct] = useState({ name: '', price: '', description: '', category: 'men', image: null });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const formData = new FormData();
            formData.append('name', product.name);
            formData.append('price', product.price);
            formData.append('description', product.description);
            formData.append('category', product.category);
            if (product.image) formData.append('image', product.image);

            const response = await axios.post('/product', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                timeout: 30000  // 30 second timeout - stops infinite loading
            });

            if (response.data.success) {
                setMessage({ type: 'success', text: '✅ Product added successfully!' });
                setProduct({ name: '', price: '', description: '', category: 'men', image: null });
                e.target.reset();
                setRefreshTrigger(prev => prev + 1);
            } else {
                setMessage({ type: 'error', text: '❌ Server error: ' + (response.data.message || 'Unknown error') });
            }
        } catch (err) {
            if (err.code === 'ECONNABORTED') {
                setMessage({ type: 'error', text: '❌ Upload timed out. Image may be too large. Try a smaller image.' });
            } else {
                const errMsg = err.response?.data?.error || err.response?.data?.message || err.message || 'Failed to add product';
                setMessage({ type: 'error', text: `❌ ${errMsg}` });
            }
        } finally {
            setLoading(false);  // ALWAYS stop loading, no matter what
            setTimeout(() => setMessage(''), 5000);
        }
    };
    return (
        <div className="card shadow-sm border-0 mb-4">
            <div className="card-header bg-white border-bottom-0 pt-4 pb-0">
                <h4 className="mb-0">Add New Product</h4>
            </div>
            <div className="card-body">
                {message && (
                    <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'} py-2`}>
                        {message.text}
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Product Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={product.name}
                                onChange={(e) => setProduct({...product, name: e.target.value})}
                                required 
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Price</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                value={product.price}
                                onChange={(e) => setProduct({...product, price: e.target.value})}
                                required 
                            />
                        </div>
                    </div>
                    
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea 
                            className="form-control" 
                            rows="3"
                            value={product.description}
                            onChange={(e) => setProduct({...product, description: e.target.value})}
                            required 
                        ></textarea>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Category</label>
                        <select className="form-select" value={product.category} onChange={(e) => setProduct({...product, category: e.target.value})}>
                            <option value="men">Men</option>
                            <option value="women">Women</option>
                            <option value="accessories">Accessories</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Upload Image</label>
                        <input 
                            type="file" 
                            className="form-control" 
                            accept="image/*"
                            onChange={(e) => setProduct({...product, image: e.target.files[0]})}
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Adding Product...' : 'Add Product'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AdminDashBoard