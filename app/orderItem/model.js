const mongoose = require('mongoose')
const { model, Schema } = mongoose

const orderItemSchema = Schema({
    
    name: {
        type: String,
        minlength: [5, 'Item name is 5 characters at least'],
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    qty: {
        type: Number,
        required: true,
        min: 1
    },

    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },

    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }
});

module.exports = model('OrderItem', orderItemSchema)