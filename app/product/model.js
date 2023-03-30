const mongoose = require('mongoose')
const { model, Schema } = mongoose;

const productSchema = Schema({

    name: {
        type: String,
        minLength: [3, 'Product name must be at least 3 characters'],
        required: [true, 'Product name is required!']
    },

    description: {
        type: String,
        maxLength: [1000, 'Maximum characters is 1000']
    },

    price: {
        type: Number,
        default: 0
    },

    categories: {
        type: Schema.Types.ObjectId,
        ref: 'Categories'
    },

    createdAt: {
        type: Date
    },

    updatedAt: {
        type: Date
    },

    img_path: String,

    
},{ timestamp: true });

module.exports = model('Product', productSchema);