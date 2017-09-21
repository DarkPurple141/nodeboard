const express = require('express');
const router = express.Router();

/* GET home listing. */
router.get('/', function(req, res, next) {
  // Note that root component is special
  // in that it must be placed last
  res.render('base', {
    components: ["navbar","footer","login"],
    layout: false
  });
});

module.exports = router;
