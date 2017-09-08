const express = require('express');
const router = express.Router();

/* GET home page. */
/* authenticate the user */
router.get('/', function(req, res, next) {
  res.render('home', {title: "NodeBoard"});
});

module.exports = router;
