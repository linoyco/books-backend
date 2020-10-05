const express = require('express');

const Book = require('../models/book');
const authToken = require('../app');

const router = express.Router();

router.post('/add-book', authToken, async (req, res) => {
    try {
        const book = new Book({
            bookName: req.body.bookName,
            author: req.body.author,
            publisher: req.body.publisher,
            price: req.body.price,
            imageURL: req.body.imageURL,
            stars: Math.random() * 5
        });
        const newBook = await book.save();
        res.json(newBook);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.patch('/update-book', authToken, async (req, res) => {
    try {
        const book = await Book.findById(req.body.bookId);

        book.bookName = req.body.bookName;
        book.author = req.body.author;
        book.publisher = req.body.publisher;
        book.imageURL = req.body.imageURL;
        book.price = req.body.price;
        book.stars = req.body.stars;

        const bookUpdated = await book.save();
        res.json(bookUpdated);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.patch('/delete-book', authToken, async (req, res) => {
    try {
        await Book.findById(req.body.bookId).deleteOne();
        res.status(200).send('this book deleted...');
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;