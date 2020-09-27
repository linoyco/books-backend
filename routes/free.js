const express = require('express');
const Book = require('../models/book');

const router = express.Router();

//GET ALL
router.get('/', async (req, res, next) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(400).send('error --->>> ', err);
    }
});

// SEARCH
router.post('/search', async (req, res, next) => {
    try {
        let newList = [];
        const book = await Book.find({ bookName: new RegExp(req.body.q, 'gi') });
        newList.push(book);
        res.json(newList);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;