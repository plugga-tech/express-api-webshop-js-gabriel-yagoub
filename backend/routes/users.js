var express = require('express');
var router = express.Router();


let users = [
  {id: 1, name: 'Kalle', password: '123', email: 'test1@testmail.com'},
  {id: 2, name: 'Pelle', password: '456', email: 'test2@testmail.com'},
  {id: 3, name: 'Nisse', password: '789', email: 'test3@testmail.com'}
];

// HÄMTA ALLA USERS // SKICKA INTE MED LÖSENORD // BARA ID, NAMN + EMAIL PÅ ALLA USERS
router.get('/', function(req, res, next) {
  const userListWithoutPasswords = users.map(user => ({
    name: user.name,
    email: user.email
  }));
  res.json(userListWithoutPasswords);
});

module.exports = router;
