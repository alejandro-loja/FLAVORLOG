// ROUTES FOR WEBPAGES & MYSQL QUERIES
const express = require('express');
const flavorlog = require("../models/flavorlog.js");
const router = express.Router();

console.log("------");



// ROUTE FOR MAIN PAGE & TO RETRIEVE ALL ENTRIES ON MYSQL
router.get("/", function (req, res) {
  flavorlog.all(function (flavorData) {
    res.render("index", { flavor_data: flavorData });
  });
});

router.get("/one_entry", function (req, res) {
  flavorlog.all(function (flavorData) {
    res.render("one_entry", { flavor_data: flavorData });
  });
});

/// ROUTE TO RETEIVE ONE ENTRY AN ENTRY ON MYSQL
router.get("/flavorlog/getOne/:id", function (req, res) {

  const editId = req.params.id;
  console.log(`EditId is ${editId}`)

  //editId in array so it will always count the .length as one in the printquestionmarks function
  flavorlog.getOne([editId], function (result) {
    // Send back the ID of the new quote
    console.log(result)
    // result[0] is getting the first and only object returned
    res.json(result[0]);
  });
});

// ROUTE TO CREATE AN ENTRY ON MYSQL
router.post("/flavorlog/create", function (req, res) {
  console.log(req.body);
  const { rmName, rmNa, rmDosNum, rmDosUnit, rmDesc } = req.body;

  flavorlog.create([rmName, rmNa, rmDosNum, rmDosUnit, rmDesc]
    , function (result) {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });
});

// ROUTE TO DELETE AN ENTRY ON MYSQL
router.delete("/flavorlog/delete/:id", function (req, res) {
  const idName = `id = ${req.params.id}`;
  console.log(req.body.msg)

  flavorlog.delete(idName, function () {
    res.status(200).end();
  })
});

// ROUTE TO EDIT AN ENTRY
router.put("/flavorlog/update/:id", function (req, res) {
  const idName = `id = ${req.params.id}`;
  console.log(idName);
  console.log(req.body);
  const whatIsChanging = {rm_description : req.body.rmDesc};
  flavorlog.update(whatIsChanging, idName, function () {
    res.status(200).end();
  })
});
module.exports = router;