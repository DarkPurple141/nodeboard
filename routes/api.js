const express = require('express');
const router = express.Router();

/* GET user listing. */
router.get('/user', function(req, res, next) {
  //res.send('respond with a resource');
  // processes infro from passport.js
  // and passes it back in a nice form
  // that the front end can use. 
  response = {
  	"success": false,
  	"name" : "UNKNOWN"
  };
  res.send(response);
});

module.exports = router;
