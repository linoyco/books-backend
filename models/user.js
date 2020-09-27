const mongoose = require('mongoose');
const Purchase = require('./purchase');

const userSchema = new mongoose.Schema({
    permission: String,
    fullName: String,
    token: String,
    imageURL: String,
    lastPurchase: Purchase
});

module.exports = mongoose.model('user', userSchema);