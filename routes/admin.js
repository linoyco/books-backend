const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    try {
        res.send('<h1>Welcome Admin!!</h1>');
    } catch (err) {
        console.log('error --->>> ', err);
    }
});

module.exports = router;