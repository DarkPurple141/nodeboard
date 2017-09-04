const express = require('express');
const router = express.Router();

/* GET got listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.render('got', {layout: 'game'});
});

module.exports = router;
