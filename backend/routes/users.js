var express = require('express');
const { ObjectId } = require('mongodb');
var router = express.Router();

// HÄMTA ALLA USERS // SKICKA INTE MED LÖSENORD // BARA ID, NAMN + EMAIL PÅ ALLA USERS
router.get('/', function(req, res, next) {
  req.app.locals.db.collection('users')
  .find({}, {projection: {password: 0}}).toArray()
  .then(result => {
    res.json(result)
  })
  .catch(error => console.error(error, "Ett fel uppstod när alla användare skulle hämtas"))
});


// // HÄMTA SPECIFIK USER // SKICKA HELA OBJEKTET
// // router.post('/', function(req, res, next) {
// //   const specificId = req.body.id;
// //   const user = users.find(user => user.id == specificId);
// //   res.json(user);
// // });

// router.post('/', function(req, res, next) {
//   const specificId = req.body.id;
//   const foundUserId = users.find(user => user.id == specificId);
//   if (foundUserId) {
//     res.json(foundUserId);
//   }
//   else {
//     res.send("Ingen användare med detta id hittades");
//   };
// });

// HÄMTA SPECIFIK USER // SKICKA HELA OBJEKTET
router.post('/', function(req, res, next) {
  req.app.locals.db.collection('users').findOne({"_id" : new ObjectId(req.body.id)})
  .then(result => {
    res.json(result)
  });
});

// SKAPA USER 
router.post('/add', function(req, res, next) {
  const newUser = req.body;
  req.app.locals.db.collection('users').insertOne(newUser)
  res.send("Användare tillagd");
});

// LOGGA IN USER
router.post('/login', function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  req.app.locals.db.collection('users').findOne({"email": email, "password": password})
  .then(result => {
    if (result) {
      res.send("Inloggad");
    }
    else {
      res.send("Fel email eller lösenord");
    }
  })
});

module.exports = router;
