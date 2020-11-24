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

// post 
router.post("/flavorlog/create", function(req, res) {
  console.log(req.body);
  const {rmName,rmNa,rmDosNum,rmDosUnit,rmDesc} = req.body;
  
  flavorlog.create([rmName,rmNa,rmDosNum,rmDosUnit,rmDesc]
  , function (result) {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });
});


router.delete("/flavorlog/delete/:id", function(req, res) {
  const idName = `id = ${req.params.id}`;
  console.log(req.body.msg) 

  flavorlog.delete(idName, function(){
    res.status(200).end();
  })
});

module.exports = router;