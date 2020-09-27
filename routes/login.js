const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const router = express.Router();

router.get('/', (res) => {
    try {
        res.send('<form action="/login" method="POST"><input type="text" name="name" placeholder="First Name"/><br/><input type="password" name="password" placeholder="Password"/><br/><button type="submit">Log-in</button></form>');
    } catch (err) {
        res.status(400).send(err);
    }
});

//LOGIN AND SAVE USER
router.post('/', async (req, res) => {
    await User.deleteMany(() => { console.log('USERS clean :)') });
    try {
        let userPermission = 'Customer';
        if (req.body.name === 'linoy cohen') {
            userPermission = 'Admin'
        }

        const token = jwt.sign(req.body.name, process.env.ACESS_TOKEN_SECRET)

        const user = new User({
            permission: userPermission,
            fullName: req.body.name,
            token: token,
            imageURL: 'https://emojigraph.org/media/openmoji/winking-face_1f609.png',
            lastPurchase: {
                date: '',
                bookId: ''
            }
        });

        const saveUser = await user.save();
        res.json(saveUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

//LOGOUT
router.delete('/logout', async (req, res) => {
    try {
        await User.deleteMany(() => { console.log('USERS clean :)') });
        res.status(200).send('bye bye...');
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;