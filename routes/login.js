const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('<form action="/login" method="POST"><input type="text" name="name" placeholder="First Name"/><br/><input type="password" name="password" placeholder="Password"/><br/><button type="submit">Log-in</button></form>');
});

router.post('/', (req, res, next) => {
    console.log(req.body);
    if (req.body.name === 'linoy') {
        return res.redirect('/admin');
    }
    return res.redirect('/user');
});

module.exports = router;