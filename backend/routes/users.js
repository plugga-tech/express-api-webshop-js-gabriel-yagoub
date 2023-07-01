var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Du är nu inne i users routern!');
});

module.exports = router;
