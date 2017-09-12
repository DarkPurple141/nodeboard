const express = require('express');
const router = express.Router();

/* GET user listing. */
router.get('/user', function(req, res, next) {
  //res.send('respond with a resource');
  response = {
  	"success": false,
  	"name" : "UNKNOWN"
  };
  res.send(response);
});

module.exports = router;
