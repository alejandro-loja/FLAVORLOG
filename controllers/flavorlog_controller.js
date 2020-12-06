// This is where all the pages are made
const express = require('express');
const flavorlog = require("../models/flavorlog.js");
const router = express.Router();

// for __dirname
const path = require('path');
const { response } = require('express');

console.log("------");


router.get("/", function (req, res) {
    res.redirect("/results");
});

//get one entry only
router.get("/flavorlog/getOne/:id", function (req, res) {

  const editId = req.params.id;
  console.log(`EditId is ${editId}`)

  //editId in array so it will always count the .length as one in the printquestionmarks function
  flavorlog.getOne([editId], function (result) {
        // Send back the ID of the new quote
        console.log(result)
        res.json(result[0]);
      });
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


router.put("/flavorlog/update/:id", function(req, res) {
  const idName = `id = ${req.params.id}`;
  console.log(req.body.msg) 

  flavorlog.update(idName, function(){
    res.status(200).end();
  })
});
module.exports = router;