import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingProduct, setEditingProduct] = useState(null);
    const [editForm, setEditForm] = useState({ name: '', price: '', description: '', image: '' });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/product');

            if (response.data.success) {
                setProducts(response.data.products || []);
            } else {
                setProducts(Array.isArray(response.data) ? response.data : []);
            }

            setError('');
        } catch (err) {
            setError('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (productId) => {
        if (!window.confirm('Are you sure you want to delete this product?')) {
            return;
        }

        try {
            await axios.delete(`/product/${productId}`);
            fetchProducts(); // Refresh list
        } catch (err) {
            alert('Failed to delete product');
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product._id);
        setEditForm({
            name: product.name,
            price: product.price,
            description: product.description,
            image: product.image || ''
        });
    };

    const handleUpdate = async (productId) => {
        try {
            await axios.put(`/product/${productId}`, editForm);
            setEditingProduct(null);
            fetchProducts(); // Refresh list
        } catch (err) {
            alert('Failed to update product');
        }
    };

    const cancelEdit = () => {
        setEditingProduct(null);
        setEditForm({ name: '', price: '', description: '', image: '' });
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', color: 'white', padding: '50px' }}>
                <h3>Loading products...</h3>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ textAlign: 'center', color: 'white', padding: '50px' }}>
                <h3 style={{ color: '#e74c3c' }}>{error}</h3>
                <button onClick={fetchProducts} className="btn" style={{ marginTop: '20px' }}>
                    Try Again
                </button>
            </div>
        );
    }
    return (
        <div className="card shadow-sm border-0">
            <div className="card-header bg-white border-bottom-0 pt-4 pb-0">
                <h4 className="mb-0">Product List</h4>
            </div>
            <div className="card-body">
                {products.length === 0 ? (
                    <div className="alert alert-info">No products found.</div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id}>
                                        <td>
                                            {product.image ? (
                                                <img 
                                                    src={product.image} 
                                                    alt={product.name} 
                                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                    className="rounded"
                                                />
                                            ) : (
                                                <div className="bg-secondary rounded text-white d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', fontSize: '10px' }}>
                                                    No Img
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            {editingProduct === product._id ? (
                                                <input 
                                                    type="text" 
                                                    className="form-control form-control-sm" 
                                                    value={editForm.name} 
                                                    onChange={e => setEditForm({...editForm, name: e.target.value})} 
                                                />
                                            ) : (
                                                <span className="fw-medium">{product.name}</span>
                                            )}
                                        </td>
                                        <td>
                                            {editingProduct === product._id ? (
                                                <input 
                                                    type="number" 
                                                    className="form-control form-control-sm" 
                                                    value={editForm.price} 
                                                    onChange={e => setEditForm({...editForm, price: e.target.value})} 
                                                />
                                            ) : (
                                                <span>${product.price}</span>
                                            )}
                                        </td>
                                        <td>
                                            {editingProduct === product._id ? (
                                                <textarea 
                                                    className="form-control form-control-sm" 
                                                    value={editForm.description} 
                                                    onChange={e => setEditForm({...editForm, description: e.target.value})} 
                                                />
                                            ) : (
                                                <span className="text-muted text-truncate d-inline-block" style={{ maxWidth: '200px' }}>
                                                    {product.description}
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            {editingProduct === product._id ? (
                                                <div className="btn-group btn-group-sm">
                                                    <button onClick={() => handleUpdate(product._id)} className="btn btn-success">Save</button>
                                                    <button onClick={cancelEdit} className="btn btn-secondary">Cancel</button>
                                                </div>
                                            ) : (
                                                <div className="btn-group btn-group-sm">
                                                    <button onClick={() => handleEdit(product)} className="btn btn-outline-primary">Edit</button>
                                                    <button onClick={() => handleDelete(product._id)} className="btn btn-outline-danger">Delete</button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductList