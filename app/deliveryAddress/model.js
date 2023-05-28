const { Schema, model } = require('mongoose')

const deliveryAddressSchema = Schema({

    address: {
        type: String,
        required: [true, 'Address cannot be empty'],
        maxLength: [255, 'Maximum characters is 255']
    },

    kelurahan: {
        type:String,
        required: [true, 'Kelurahan cannot be empty'],
        maxLength: [255, 'Maximum characters is 255']
    },

    kecamatan: {
        type: String,
        required: [true, 'Kecamatan cannot be empty'],
        maxLength: [255, 'Maximum characters is 255']
    },

    kabupaten: {
        type: String,
        required: [true, 'Kabupaten cannot be empty'],
        maxLength: [255, 'Maximum characters is 255']
    },

    provinsi: {
        type: String,
        required: [true, 'Provinsi cannot be empty'],
        maxLength: [255, 'Maximum characters is 255']
    },

    addressDetail: {
        type: String,
        required: [true, 'Detail cannot be empty'],
        maxLength: [1000, 'Maximum characters is 1000']
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    createdAt: {
        type: Date
    }
}, {timestamp: true})

module.exports = model('deliveryAddress', deliveryAddressSchema)