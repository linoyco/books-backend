const express = require('express');
const moment = require('moment');

const User = require('../models/user');
const Book = require('../models/book');
const authToken = require('../app');

const router = express.Router();

router.get('/', (req, res, next) => {
    try {
        res.send('<h1>Welcome User!!</h1>');
    } catch (err) {
        console.log('error --->>> ', err);
    }
});

//LAST PURCHASE
router.get('/:bookId', async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.bookId);
        res.json(book);
    } catch (err) {
        res.status(400).send('error --->>> ', err);
    }
});

//PURCHASE BOOK
router.patch('/purchase-book/:id', authToken, async (req, res, next) => {
    try {
        let user = await User.find();
        user[0].lastPurchase = { date: moment().format('MMMM Do YYYY, h:mm'), bookId: req.params.id }

        const userUpdated = await user[0].save();
        res.json(userUpdated);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;