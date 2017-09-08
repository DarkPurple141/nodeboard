const express = require('express');
const router = express.Router();

/* GET got listing. */
router.get(/.*/, function(req, res, next) {
  //res.send('respond with a resource');
  res.render('squares', {layout: 'squares-layout'});
});

module.exports = router;
