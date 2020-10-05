const express = require('express');
const moment = require('moment');

const User = require('../models/user');
const Book = require('../models/book');
const authToken = require('../app');

const router = express.Router();

router.patch('/last-purchase', authToken, async (req, res) => {
    try {
        const book = await Book.findById(req.body.bookId);
        res.json(book);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.patch('/purchase-book', authToken, async (req, res) => {
    try {
        let user = await User.find();
        user[0].lastPurchase = { date: moment().format('MMMM Do YYYY, h:mm'), bookId: req.body.bookId }

        const userUpdated = await user[0].save();
        res.json(userUpdated);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;