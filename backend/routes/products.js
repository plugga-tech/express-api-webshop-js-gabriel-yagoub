var express = require('express');
const { ObjectId } = require('mongodb');
var router = express.Router();

// HÄMTA ALLA PRODUKTER
router.get('/', function(req, res, next) {
  req.app.locals.db.collection('products').find().toArray()
  .then(result => {
    res.json(result)
  })
  .catch(error => console.error(error, "Ett fel uppstod när alla produkter skulle hämtas"))
});


// HÄMTA SPECIFIK PRODUKT
router.get('/:id', function(req, res, next) {
  req.app.locals.db.collection('products').findOne({"_id" : new ObjectId(req.params.id)})
  .then(result => {
    res.json(result)
  });
});

// SKAPA PRODUKT 
router.post('/add', function(req, res, next) {
  const newProduct = req.body;
  req.app.locals.db.collection('products').insertOne(newProduct)
  res.send("Produkt tillagd");
});

module.exports = router;
