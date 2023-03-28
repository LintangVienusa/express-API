const { mongoose } = require("mongoose");
const {model, Schema} = mongoose;

let categorySchema = Schema({
    name: {
        type: String,
        minLength: [3, 'Minimum length is 3 characters'],
        maxLength: [20, 'Maximum length is 20 characters'],
        required: [true, 'Categories cannot be empty!']
    }
})

module.exports = model('Categories', categorySchema);