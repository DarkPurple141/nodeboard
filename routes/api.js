const express = require('express');
const api = require('../controllers/api');
const auth = require('../controllers/authentication');
const router = express.Router();

/* GET user listing. */
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get("/authStatus/", auth.isLoggedIn);

router.get('/login/', auth.login);

router.get('/error/', auth.error);

router.post('/logout/', auth.logout);

router.all(/.*/, api.loggedIn);

router.get('/user/', api.getUser);

module.exports = router;
