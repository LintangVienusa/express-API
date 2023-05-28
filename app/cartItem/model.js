const mongoose = require('mongoose')
const { model, Schema } = mongoose

const cartItemSchema = Schema({
    name: {
        type: String,
        minLength: 'Item length should be minimum of 5 characters',
        required: true
    },

    qty: {
        type: Number,
        required: [true, 'Quantity cannot be empty'],
        min: [1, 'Minimum quantity is 1!']
    },

    price: {
        type: Number,
        default: 0
    },

    image_path: String,

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
});

module.exports = model('CartItem', cartItemSchema);