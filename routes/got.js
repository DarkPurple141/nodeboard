const express = require('express');
const router = express.Router();
const Game =

/* GET got listing. */
// TODO this should be dealt with only through gameIndex "Play"
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.render('got', {layout: 'got-layout'});
});

module.exports = router;
