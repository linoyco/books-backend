const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    try {
        res.send('<form action="/login" method="POST"><input type="text" name="name" placeholder="First Name"/><br/><input type="password" name="password" placeholder="Password"/><br/><button type="submit">Log-in</button></form>');
    } catch (err) {
        console.log('error --->>> ', err);
    }
});

router.post('/', (req, res, next) => {
    try {
        console.log(req.body);
        if (req.body.name === 'linoy') {
            return res.redirect('/admin');
        }
        return res.redirect('/user');
    } catch (err) {
        console.log('error --->>> ', err);
    }
});

module.exports = router;