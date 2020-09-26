const express = require('express');
const Book = require('../models/book');

const router = express.Router();

router.get('/', (req, res, next) => {
    try {
        res.send('<h1>Welcome Admin!!</h1>');
    } catch (err) {
        console.log('error --->>> ', err);
    }
});

//CREATE
router.post('/add-book', async (req, res, next) => {
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
            imageURL: req.body.imageURL,
            price: req.body.price
        });
        const newBook = await book.save();
        res.json(newBook);
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
});

//UPDATE
router.patch('/update-book/:id', async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);

        book.bookName = req.body.bookName;
        book.author = req.body.author;
        book.publisher = req.body.publisher;
        book.imageURL = req.body.imageURL;

        const bookUpdated = await book.save();
        res.json(bookUpdated);
    } catch (err) {
        res.status(400).send(err);
    }
});

//DELETE
router.delete('/delete-book/:id', async (req, res, next) => {
    try {
        await Book.findById(req.params.id).deleteOne();
        res.status(200).send('this book deleted...');
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;