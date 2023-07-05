var express = require('express');
var router = express.Router();
const OrderModel = require('../models/order-model');
const ProductModel = require('../models/product-model');

// Skapa ny order för en specifik användare - OK!
router.post('/add', async (req, res) => {
    const {products} = req.body;
    for (const productItem of products) {
        try {
            const product = await ProductModel.findById(productItem.productId);
            product.lager = product.lager - productItem.quantity;
            await product.save();
        } catch(error) {
            res.status(404).json("Felaktigt produkt-id");
            return;
        }
    }
    try{
        const newOrder = await OrderModel.create(req.body);
        res.json(newOrder);
    } catch(error) {
        res.status(404).json("Felaktigt användar-id");
    }
});

// Hämta alla ordrar - OK!
router.get('/all', async (req, res) => {
    const allOrders = await OrderModel.find();
    res.status(200).json(allOrders);
})


module.exports = router;



