const mongoose = require('mongoose')
const { model, Schema } = mongoose

const invoiceSchema = Schema({
     
    sub_total: {
        type: Number,
        required: true
    },

    delivery_fee: {
        type: Number,
        required: true
    },

    delivery_address: {
        provinsi: { type: String, required: [true, 'Provinsi cannot be empty!'] },
        kabupaten: { type: String, required: [true, 'Kabupaten cannot be empty!'] },
        kecamatan: { type: String, required: [true, 'Kecamatan cannot be empty!'] },
        kelurahan: { type: String, required: [true, 'Kelurahan cannot be empty!'] },
        detail: { type: String }
    }, 

    total: {
        type: Number,
        required: true
    },

    payment_status: {
        type: String,
        enum: ['waiting', 'paid'],
        default: 'waiting'
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }
}, { timestamps: true });

module.exports = model('Invoice', invoiceSchema)