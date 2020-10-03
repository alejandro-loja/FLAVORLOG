// This is where all the pages are made
const express = require('express');

// var burger = require("../models/burger.js");

const router = express.Router();

// for __dirname
const path = require('path');

console.log("------");


// homepage
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});


module.exports = router;