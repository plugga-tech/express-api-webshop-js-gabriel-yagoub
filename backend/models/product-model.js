const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    lager: Number,
});

module.exports = mongoose.model('product', productSchema);