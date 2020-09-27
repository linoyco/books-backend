const express = require('express');

const User = require('../models/user');

const router = express.Router();

router.get('/', (req, res, next) => {
    try {
        res.send('<form action="/login" method="POST"><input type="text" name="name" placeholder="First Name"/><br/><input type="password" name="password" placeholder="Password"/><br/><button type="submit">Log-in</button></form>');
    } catch (err) {
        console.log('error --->>> ', err);
    }
});

//LOGIN AND SAVE USER
router.post('/', async (req, res, next) => {
    await User.deleteMany(() => { console.log('USERS clean :)') });

    try {
        let userPermission = 'Customer';

        if (req.body.name === 'linoy cohen') {
            userPermission = 'Admin'
        }

        const user = new User({
            permission: userPermission,
            fullName: req.body.name,
            token: req.body.password,
            imageURL: 'https://emojigraph.org/media/openmoji/winking-face_1f609.png',
            lastPurchase: {
                date: '',
                bookId: ''
            }
        });

        const saveUser = await user.save();
        res.json(saveUser);
    } catch (err) {
        console.log('error --->>> ', err);
    }
});



//in login> delete USERS db, login, edit permission, save user.

//log out> delete USER

module.exports = router;