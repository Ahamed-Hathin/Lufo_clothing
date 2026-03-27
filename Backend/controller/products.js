import Product from '../modules/Product.js'
import product from '../modules/Product.js'
import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'

dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// Helper: upload buffer to Cloudinary
const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'products' },
            (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
            }
        );
        stream.end(buffer);
    });
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort('-createdAt')
        res.status(200).json({
            success: true,
            count: products.length,
            products
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch products',
            error: error.message
        })
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }
        res.json({
            success: true,
            product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch product',
            error: error.message
        })
    }
}

const createProduct = async (req, res) => {
    try {
        const { name, price, description, category } = req.body;
        let imageUrl = '';
        if (req.file) {
            imageUrl = await uploadToCloudinary(req.file.buffer);
        }
        const product = await Product.create({
            name, price, description, category: category || 'men', image: imageUrl
        });
        res.status(201).json({ success: true, product })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create product', error: error.message })
    }
}

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
        res.status(200).json({ success: true, product })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update product', error: error.message })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
        res.status(200).json({ success: true, message: 'Product deleted' })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete product', error: error.message })
    }
}

const menProducts = async (req, res) => {
    try {
        const products = await Product.find({ category: 'men' }).sort('-createdAt');
        res.status(200).json({ success: true, count: products.length, products })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch men products' })
    }
}

const womenProducts = async (req, res) => {
    try {
        const products = await Product.find({ category: 'women' }).sort('-createdAt');
        res.status(200).json({ success: true, count: products.length, products })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch women products' })
    }
}

const accessoriesProducts = async (req, res) => {
    try {
        const products = await Product.find({ 
            category: { $in: ['accessories', 'electronics'] } 
        }).sort('-createdAt');
        res.status(200).json({ success: true, count: products.length, products })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch accessories products' })
    }
}

export { getAllProducts, getProductById, menProducts, womenProducts, accessoriesProducts, createProduct, updateProduct, deleteProduct }




