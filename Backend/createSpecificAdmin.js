import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './modules/User.js';
import bcrypt from 'bcrypt';

dotenv.config();

const createSpecificAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const email = 'ahamedhaden.r@gmail.com';
        const password = 'ahamed@123';
        
        let user = await User.findOne({ email });
        const hashPassword = await bcrypt.hash(password, 10);

        if (user) {
            user.password = hashPassword;
            user.role = 'admin';
            await user.save();
            console.log('Admin user updated successfully');
        } else {
            await User.create({
                name: 'Ahamed',
                email: email,
                password: hashPassword,
                role: 'admin'
            });
            console.log('Admin user created successfully');
        }
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

createSpecificAdmin();
