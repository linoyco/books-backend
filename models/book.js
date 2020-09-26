const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publisher: {
        type: String,
        required: true,
    },
    imageURL: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('book', bookSchema);