const mongoose = require('mongoose');

const shopingCartSchema = new mongoose.Schema({
    couch: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Couch"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    amount: {
        type: Number,
        default: 1
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ShopingCart', shopingCartSchema);