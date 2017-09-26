const express = require('express');
const router = express.Router();
const GC = require('../controllers/gameIndex');

/* GET game listings. */
router.get('/', function(req, res, next) {
  GC.gameList(function(games) {
    res.render('home', {
      title: "NodeBoard Play",
      games: games.map(obj => obj.name)
    })
  })
})

router.get('/:game/', GC.activeGames);

router.post('/:game/create/', GC.createGame);

router.get('/:game/join/:id/', GC.joinGame);

router.get('/:game/game/:id', GC.playGame);

module.exports = router;
