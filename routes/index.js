const express = require('express');
const router = express.Router();
const GC = require('../controllers/gameIndex')

/* GET home page. */
/* authenticate the user */
router.get('/', function(req, res, next) {
  if (req.user) {
    let games;//[{name: "Jeff"}, {name: "Alan"}]
    GC.gameList(function(data) {
      games = data;
      res.render('home', {title: "NodeBoard", games: games.map(obj => obj.name)});
    })

  } else {
    console.log("No user associated with session: " + req.session);
    res.redirect('/login');
  }
});

module.exports = router;
