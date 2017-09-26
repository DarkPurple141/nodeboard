const express = require('express');
const router = express.Router();


/* GET got listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.render('got', {layout: 'got-layout'});
});

router.get('/:game/create/', function(req, res, next) {
  //res.send('respond with a resource');
  res.render('got', {layout: 'got-layout'});
});

router.get('/:game/join/:id/', function(req, res, next) {
  //res.send('respond with a resource');
  res.render('got', {layout: 'got-layout'});
});

router.get('/:game/game/:id', function(req, res, next) {


});

module.exports = router;
