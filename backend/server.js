const express = require("express");
const app = express();

app.listen(3000, function() {
  console.log("Servern är igång på port 3000");
});

app.get("/", function(req, res) {
    console.log("Du är i root-foldern");
    res.send("<h1>Du är i root-foldern!!</h1>");
});