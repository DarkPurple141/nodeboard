const express = require('express');
const router = express.Router();

/* GET home listing. */
router.get('/', function(req, res, next) {
  res.render('base', {
    components: ["navbar","footer","login"],
    layout: false
  });
});

module.exports = router;
