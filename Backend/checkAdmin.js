import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './modules/User.js';

dotenv.config();

const checkAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const admins = await User.find({ role: 'admin' });
        console.log('Admins found:', admins);
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkAdmin();
