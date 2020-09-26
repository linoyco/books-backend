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

//GET ONE
router.get('/:id', async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        res.json(book);
    } catch (err) {
        res.status(400).send('error --->>> ', err);
    }
});

//SEARCH
// router.post('/', async (req, res, next) => {
//     try {
//         const books = await Book.find(req);
//         res.json(books);
//     } catch (err) {
//         res.status(400).send('error --->>> ', err);
//     }
// });



module.exports = router;