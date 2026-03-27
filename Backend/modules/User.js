import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },

    password: {
        type: String,
        required: true,
        minlength: [6, 'password must be at least 6 character']
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
},
    {
        timestamps: true
    }
)

export default mongoose.model('User', UserSchema);