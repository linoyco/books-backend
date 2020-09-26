const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const loginRoutes = require('./routes/login');
const freeRoutes = require('./routes/free');
const mongoConnect = require('./lib/db');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(freeRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/login', loginRoutes);

app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found...!!</h1>');
});


mongoConnect(client => {
    // console.log(client);
    app.listen(3000);
});