const express = require('express');

const Book = require('../models/book');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.patch('/search', async (req, res) => {
    try {
        let newList = [];
        const book = await Book.find({ bookName: new RegExp(req.body.q, 'i') });
        newList.push(book);
        res.json(newList);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;