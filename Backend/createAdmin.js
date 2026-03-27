import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './modules/User.js';
import bcrypt from 'bcrypt';

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const hashPassword = await bcrypt.hash('password123', 10);
        await User.create({
            name: 'Admin',
            email: 'hathin@gmail.com',
            password: hashPassword,
            role: 'admin'
        });
        console.log('Admin created successfully');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

createAdmin();
