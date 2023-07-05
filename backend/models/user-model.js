const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

module.exports = mongoose.model('user', userSchema);

// Det går att lägga in "unique" på t.ex email för att inte kunna skapa flera användare med samma email.
// I syfte att kunna testa koden med så lite besvär som möjligt så har jag valt att inte göra det.