const express = require('express');
const router = express.Router();

/* GET home page. */
/* authenticate the user */
router.get('/', function(req, res, next) {
  if (req.user) {
    res.render('home', {title: "NodeBoard"});
  } else {
    console.log("No user associated with session: " + req.session);
    res.redirect('/login');
  }
});

module.exports = router;
