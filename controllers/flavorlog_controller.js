// This is where all the pages are made
const express = require('express');

const flavorlog = require("../models/flavorlog.js");

const router = express.Router();

// for __dirname
const path = require('path');

console.log("------");


// homepage
router.get('/', function(req, res) {
  console.log('Went Home')
  res.sendFile(path.join(__dirname, "..", "/views/index.html"));

});

router.get('/results', function(req, res) {
  flavorlog.all(function (data) {
      var hasFlavorlog = {
        flavorlogKinds: data
      };
      console.log(hasFlavorlog);
      res.sendFile(path.join(__dirname, "..", "/views/results.html"));
    });

});

module.exports = router;