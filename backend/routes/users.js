var express = require('express');
//const { ObjectId } = require('mongodb');
var router = express.Router();
const UserModel = require('../models/user-model'); 

// Hämta alla users, exkludera password i resultatet - OK!
router.get('/', async (req, res) => {
  const findAllUsers = await UserModel.find().select('-password');
  res.json(findAllUsers);
});

// Hämta specifik user - OK!
router.post('/', async (req, res) => {
  try {
    const specificUser = await UserModel.findById(req.body.id);
    res.json(specificUser);
  } catch (err) {
  res.status(404).json("User not found");
  }
});

// Skapa user - OK!
router.post('/add', async (req, res) => {
  const newUser = UserModel.create(req.body);
  res.status(201).json(newUser);
});

// Logga in user - OK!
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userEmail = await UserModel.findOne({ email });
    const userPassword = await UserModel.findOne({ password });
    if (userEmail && userPassword) {
      res.json("Du är inloggad");
    } else {
      res.status(404).json("Fel användarnamn eller lösenord");
    }
  } catch (err) {
    res.status(404).json("Login failed");
  }
});









module.exports = router;