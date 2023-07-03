var express = require('express');
const { ObjectId } = require('mongodb');
var router = express.Router();

// SKAPA ORDER FÖR EN SPECIFIK USER // PRODUCTS ÄR EN ARRAY MOTSVARANDE INNEHÅLLET I KUNDVAGN
router.post('/add', function(req, res, next) {
  const completeOrder = {products: req.body.products, user: req.body.user}; 
  req.app.locals.db.collection("orders").insertOne(completeOrder)
  .then(result => {
    console.log(completeOrder);
    res.json(result);
  })
});



module.exports = router;



