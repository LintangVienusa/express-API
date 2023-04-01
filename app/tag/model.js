const mongoose = require('mongoose')
const { model, Schema } = mongoose

const tagSchema = Schema({
    name: {
        type: String,
        minLength: [3, 'Minimum length is 3 characters'],
        maxLength: [20, 'Maximum length is 20 characters'],
        required: [true, 'Tags cannot be empty!']
    }
})

module.exports = model('Tag', tagSchema);