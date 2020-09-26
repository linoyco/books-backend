const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const loginRoutes = require('./routes/login');
const freeRoutes = require('./routes/free');
// const mongoConnect = require('./lib/db');

const app = express();

mongoose.connect('mongodb://localhost/Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });
const con = mongoose.connection;
con.on('open', () => {
    console.log('connected!! :)');
});





app.use(bodyParser.urlencoded({ extended: false }));

app.use(freeRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/login', loginRoutes);

app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found...!!</h1>');
});


// mongoConnect(client => {
//     // console.log(client);
//     app.listen(3000);
// });

app.listen(9000);
