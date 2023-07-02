var express = require('express');
var router = express.Router();


let users = [
  {id: "1", name: 'Kalle', password: '123', email: 'test1@testmail.com'},
  {id: "2", name: 'Pelle', password: '456', email: 'test2@testmail.com'},
  {id: "3", name: 'Nisse', password: '789', email: 'test3@testmail.com'}
];

// HÄMTA ALLA USERS // SKICKA INTE MED LÖSENORD // BARA ID, NAMN + EMAIL PÅ ALLA USERS
router.get('/', async function(req, res, next) {
  const userListWithoutPasswords = users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email
  }));
  res.json(userListWithoutPasswords);
});

// HÄMTA SPECIFIK USER // SKICKA HELA OBJEKTET
router.post('/', function(req, res, next) {
  const id = req.body.id;
  const user = users.find(user => user.id == id);
  res.json(user);
});

// SKAPA USER
router.post('/add', function(req, res, next) {
  const newUser = req.body;
  users.push(newUser);
  res.json(newUser);
});



module.exports = router;
