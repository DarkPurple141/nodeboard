const express = require('express');
const router = express.Router();
const GC = require('../controllers/gameIndex')

/* GET home page. */
/* authenticate the user */
router.get('/', function(req, res, next) {
  if (req.user) {
    GC.gameList(function(games) {
      res.render('home', {
        title: "NodeBoard",
        games: games.map(obj => obj.name)
      });
    })
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
