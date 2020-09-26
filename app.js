const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const loginRoutes = require('./routes/login');
const freeRoutes = require('./routes/free');

const app = express();

mongoose.connect('mongodb://localhost/Books', { useNewUrlParser: true, useUnifiedTopology: true });
const con = mongoose.connection;
con.on('open', () => {
    console.log('connected!! :)');
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
