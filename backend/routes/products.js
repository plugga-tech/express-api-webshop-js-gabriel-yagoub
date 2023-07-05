var express = require('express');
var router = express.Router();
const ProductModel = require('../models/product-model');

// Hämta alla produkter - OK!
router.get('/', async (req, res) => {
  const findAllProducts = await ProductModel.find();
  res.json(findAllProducts);
});

// Hämta specifik produkt - OK!
router.get('/:id', async (req, res) => {
  try {
    const specificProduct = await ProductModel.findById(req.params.id);
    res.json(specificProduct);
  } catch (err) {
    res.status(404).json("Product not found");
  }
})

// Skapa produkt - OK!
router.post('/add', async (req, res) => {
  const newProduct = ProductModel.create(req.body);
  res.status(201).json(newProduct);
})

// Skapa order för en specifik user



module.exports = router;
