const express = require('express');
const router = express.Router();

router.get(/.*/, function(req, res, next) {
  //res.send('respond with a resource');
  res.render('api-error', {layout: 'api-error-layout'});
});

module.exports = router;
