import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity cannot be less than 1'],
            default: 1
        }

    }]

})

export default mongoose.model('Cart', cartSchema)