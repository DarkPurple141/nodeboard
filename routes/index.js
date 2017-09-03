const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //console.log("HERE");
  //res.send("NOTHING");
  res.render('home', {title: "Some info"});

});

module.exports = router;
