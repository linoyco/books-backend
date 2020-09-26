const mongoose = require('mongoose');
const User = require('./user');
const Book = require('./book');

const purchaseSchema = new mongoose.Schema({
    customerDetails: {
        type: User,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    book: {
        type: Book,
        required: true,
    }
});

module.exports = mongoose.model('purchase', purchaseSchema);