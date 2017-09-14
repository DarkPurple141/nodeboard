const express = require('express');
const router = express.Router();

/* GET user listing. */
router.get('/user', function(req, res, next) {
  // processes info from passport.js
  // and passes it back in a nice form
  // that the front end can use.
  let response = {};
  if(req.isAuthenticated){
    console.log(req.session);
	  response.success = true;
	  response.name = "KNOWN";
  }else{
    console.log(req.session);
	  response.success = false;
	  response.name = "UNKNOWN";
  }
  res.send(response);
});

module.exports = router;
