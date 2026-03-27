import mongoose from "mongoose";

const productSchema = mongoose.Schema({

    name:{
        type:String,
        required:[true, 'product name is required'],
        trim:true
    },

    price:{
        type:Number,
        required:[true, 'product price is required'],
        min:[1, 'price connot be zero']
    },

    description:{
        type:String,
        required:[true, 'product description required'],
    },
    image:{
        type: String,
        default: ''
    },
    category:{
        type: String,
        default: 'men'
    }
},
{
    timestamps: true
}
)

export default mongoose.model('Product', productSchema);