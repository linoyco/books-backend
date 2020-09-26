const mongoose = require('mongoose');
const Author = require('./author');
const Publisher = require('./publisher');

const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true
    },
    author: {
        type: Author,
        required: true
    },
    publisher: {
        type: Publisher,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('book', bookSchema);