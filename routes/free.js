const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        res.send('<h1>Hello</h1>');
    } catch (err) {
        console.log('error --->>> ', err);
    }
});

module.exports = router;