var express = require('express');
const { ObjectId } = require('mongodb');
var router = express.Router();

// router.post('/add', async function(req, res, next) {
//   const productItems = req.app.locals.db.collection("products").findOne({"_id": new ObjectId(req.body.productId)});

//   const user = await req.app.locals.db.collection("users").findOne({"_id": new ObjectId(req.body.user)});
//   const newOrder = {user: user._id, products: req.body.products}
//   const result = await req.app.locals.db.collection("orders").insertOne(newOrder);
//   res.json(result); 

// });


router.post('/add', async (req, res) => {
  // Extract user and products data from the request body
  const { user, products } = req.body;
  req.app.locals.db.collection("users").findOne({"_id": new ObjectId(req.body.user)});
  //req.app.locals.db.collection("products").findOne({"_id": {$in: products}});

  const productIds = products.map(product => product);
  const matchingProducts = await req.app.locals.db.collection('products').findOne({ _id: { $in: productIds } });

  // if (matchingProducts !== productIds) {
  //   return res.status(404).json({ error: 'One or more products not found' });
  // }

  const order = {
    user,
    products
  };

  await req.app.locals.db.collection("orders").insertOne(order);

  res.json({ message: 'Order created successfully', order });
});

module.exports = router;