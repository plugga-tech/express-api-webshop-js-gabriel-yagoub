var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');
const productsRouter = require('./routes/products');

const mongoose = require('mongoose');

var app = express();

async function init() {
    try {
        await mongoose.connect('mongodb://localhost:27017/gabriel-yagoub', {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("Ansluten till databasen");
    } catch (error) {
        console.log("Kunde inte ansluta till databasen", error);
    }
}


init();





// MongoClient.connect('mongodb://localhost:27017') // Dubbelkolla porten!!!
// .then(client => {
//     console.log("Ansluten till databasen");
//     const db = client.db("gabriel-yagoub");
//     app.locals.db = db;
// })
// .catch(err => console.log("Ingen kontakt med databasen", err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);




module.exports = app;
