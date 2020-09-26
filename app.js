const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const loginRoutes = require('./routes/login');
const freeRoutes = require('./routes/free');
const Book = require('./models/book');
const DemoList = require('./lib/demoBooks');

const app = express();

mongoose.connect('mongodb://localhost/test4', { useNewUrlParser: true, useUnifiedTopology: true });
const con = mongoose.connection;

con.on('open', async () => {
    await Book.deleteMany(() => { console.log('connect, DB clean :)') });

    for (let demo of DemoList) {
        const book = new Book({
            bookName: demo.bookName,
            author: {
                fullName: demo.author.fullName,
                age: demo.author.age
            },
            publisher: {
                publisherName: demo.publisher.publisherName,
                year: demo.publisher.year
            },
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
app.use('/login', loginRoutes);

app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found...!!</h1>');
});

app.listen(9000);
