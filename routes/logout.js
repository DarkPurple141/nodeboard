const express = require('express');
const router = express.Router();

/* GET got listing. */
router.get(/.*/, function(req, res, next) {
	req.logout();
  res.redirect('/');
});

module.exports = router;
