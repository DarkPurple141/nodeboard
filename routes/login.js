const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('base', {
    components: ["navbar","footer","login"],
    layout: false
  });
});

module.exports = router;
