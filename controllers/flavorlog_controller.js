// This is where all the pages are made
const express = require('express');
const flavorlog = require("../models/flavorlog.js");
const router = express.Router();

// for __dirname
const path = require('path');

console.log("------");
router.get("/", function (req, res) {
    res.redirect("/results");
});

router.get('/results', function(req, res) {
  flavorlog.all(function (flavorData) {
    res.render("index", {flavor_data: flavorData});
  });

});

module.exports = router;