const mongoose = require("mongoose");
const { Schema, model } = mongoose;
// const AutoIncrement = require("mongoose-sequence")(mongoose);
const bcrypt = require("bcrypt");

let userSchema = Schema({

    full_name: {
        type: String,
        required: [true, 'Name cannot be empty'],
        maxLength: [255, 'Maximum length is 255 characters'],
        minLength: [3, 'Minimum length is 3 characters']
    },
    customer_id: Number,
    email: {
        type: String,
        required: [true, 'Email cannot be empty'],
        maxLength: 255
    },

    password: {
        type: String,
        required: [true, 'Password cannot be empty'],
        minLength: [8, 'Password should be 8 characters minimum']
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    token: [String]


}, {timestamps: true})

// VALIDATE EMAIL
userSchema.path('email').validate(function(value) {
    const EMAIL_RE = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return EMAIL_RE.test(value);
}, attr => `${attr.value} must be valid Email format!`);

// CHECKING IF EMAIL ALREADY USED / REGISTERED
userSchema.path('email').validate(async function(value) {
    try {
        // query to User collection by email
        const count = await this.model('User').count({email: value});
        // if this query return 'false' then the validation failed
        // if this query return 'true' then the validation success
        return !count;
    } catch(err) {
        throw err
    }
}, attr => `${attr.value} already exist!`);

// HASHING PASSWORD
const HASH_ROUND = 10;
userSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, HASH_ROUND);
    console.log("here!")
    next()
}) 

// userSchema.plugin(AutoIncrement, {inc_field: 'customer_id'})


module.exports = model('User', userSchema)