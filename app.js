const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = authToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token === null) {
        return res.status(401).send('No token');
    }
    jwt.verify(token, process.env.ACESS_TOKEN_SECRET, (err, name) => {
        if (err) {
            return res.status(403).send('invalid token');
        }
        next();
    });
}

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const loginRoutes = require('./routes/login');
const freeRoutes = require('./routes/free');
const Book = require('./models/book');
const DemoList = require('./lib/demoBooks');

const app = express();
app.use(cors());

mongoose.connect('mongodb://localhost/test4', { useNewUrlParser: true, useUnifiedTopology: true });
const con = mongoose.connection;

con.on('open', async () => {
    await Book.deleteMany(() => { console.log('connect, DB clean :)') });
    for (let demo of DemoList) {
        const book = new Book({
            bookName: demo.bookName,
            author: demo.author,
            publisher: demo.publisher,
            price: demo.price,
            imageURL: demo.imageURL,
            stars: Math.random() * 5
        });
        await book.save();
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(freeRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use(loginRoutes);

app.use((req, res) => {
    res.status(404).send('<h1>Page not found...!!</h1>');
});

app.listen(9000);