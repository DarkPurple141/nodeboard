const express = require('express');
const router = express.Router();

/* GET home listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.render('login', {
    layout: 'login-layout',
    state: req.isAuthenticated() ? "Login" : "Logout",
    helpers: {
      capitalise : function(str) {
        return str[0].toUpper()
      }
    }
  })
});

module.exports = router;
