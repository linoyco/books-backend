const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    try {
        res.send('<h1>Welcome User!!</h1>');
    } catch (err) {
        console.log('error --->>> ', err);
    }
});

module.exports = router;