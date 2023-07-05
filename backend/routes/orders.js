var express = require('express');
var router = express.Router();
const OrderModel = require('../models/order-model');
const ProductModel = require('../models/product-model');

// Skapa ny order för en specifik användare
router.post('/add', async (req, res) => {
    const {products} = req.body;
    for (const productItem of products) {
        const product = await ProductModel.findById(productItem.productId);
        product.lager = product.lager - productItem.quantity;
        await product.save();
    } 
    const newOrder = await OrderModel.create(req.body);
    res.json(newOrder);
});








// // Skapa ny order för en specifik användare
// router.post('/add', async (req, res) => {
//     const {products} = req.body;
//     for (const productItem of products) {
//         const product = await ProductModel.findById({_id: productItem.productId});
//         product.lager = product.lager - productItem.quantity;
//         await product.save();
//     }
// });

// // Skapa ny order för en specifik användare
// router.post('/add', async (req, res) => {
//     try {
//         let products = req.body;
//         const newOrder = await OrderModel.create(req.body);
//         let product = await ProductModel.findById({_id: products.productId});
//         product.lager = product.lager - req.body.quantity;
//         console.log();
//         res.json(newOrder);
//     } catch(error){
//         res.status(404).json("Felaktigt användar id eller produkt id");
//     }
// });




// Hämta alla ordrar
router.get('/all', async (req, res) => {
    const allOrders = await OrderModel.find();
    res.json(allOrders);
})


module.exports = router;



