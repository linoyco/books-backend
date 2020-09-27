const express = require('express');

const Book = require('../models/book');
const authToken = require('../app');

const router = express.Router();

router.get('/', authToken, (req, res, next) => {
    try {
        res.send('<h1>Welcome Admin!!</h1>');
    } catch (err) {
        console.log('error --->>> ', err);
    }
});

//CREATE
router.post('/add-book', authToken, async (req, res, next) => {
    try {
        const book = new Book({
            bookName: req.body.bookName,
            author: {
                fullName: req.body.author.fullName,
                age: req.body.author.age
            },
            publisher: {
                publisherName: req.body.publisher.publisherName,
                year: req.body.publisher.year
            },
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

//UPDATE
router.patch('/update-book/:id', authToken, async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);

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

//DELETE
router.delete('/delete-book/:id', authToken, async (req, res, next) => {
    try {
        await Book.findById(req.params.id).deleteOne();
        res.status(200).send('this book deleted...');
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;