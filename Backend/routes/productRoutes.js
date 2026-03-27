import { Router } from "express";
const router = Router();
import { getAllProducts, getProductById, menProducts, womenProducts, accessoriesProducts, createProduct, updateProduct, deleteProduct } from '../controller/products.js'
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js'
import upload from '../middleware/upload.js'

// user
router.get('/', getAllProducts)
router.get('/men', menProducts)
router.get('/women', womenProducts)
router.get('/accessories', accessoriesProducts)
router.get('/:id', getProductById)

// admin

router.post('/', verifyToken, isAdmin, upload.single('image'), createProduct)
router.put('/:id', verifyToken, isAdmin, updateProduct)
router.delete('/:id', verifyToken, isAdmin, deleteProduct)

export default router
