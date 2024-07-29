const mongoose = require('mongoose')
const validator = require('validator');
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
         unique: true,
         validate: {
            validator: validator.isEmail,
            message: 'Please enter a valid email address',
        }
    },
    phone: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    zipCode: {
        type: Number,
        required: true,
    },
    roles:{
        type: String,
        enum:['User','Admin'],
        default:'User',

    }
}, {
    timestamps: true
})
module.exports = mongoose.model('User', userSchema)