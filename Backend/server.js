import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

dotenv.config()
connectDB()
const app = express()

// import routes

import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'https://lufo-clothing-z2b6.vercel.app'],
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/uploads", express.static("uploads"))


// routes 

app.use('/auth', authRoutes)
app.use('/product', productRoutes)
app.use('/cart', cartRoutes)
app.use('/order', orderRoutes)

// root Routes

app.get('/', (req, res) => {
  res.json({
    message: 'E-Commerce API is running',
    version: '1.0.0',
    endpoints: ['/auth/register', '/auth/login', '/auth/me'],
    products: ['/products', '/products/:id'],
    cart: ['/cart', '/cart/add', '/cart/update', '/cart/remove/:id', '/cart/clear']

  })
})


// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});


// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);

})


