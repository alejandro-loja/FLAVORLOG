var express = require('express');

// var burger = require("../models/burger.js");

var router = express.Router();

console.log("------");


// homepage
// router.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname + '/index.html'));
// });

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});


module.exports = router;