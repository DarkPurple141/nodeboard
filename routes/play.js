const express = require('express');
const router = express.Router();
const GC = require('../controllers/gameIndex');
const auth = require('../controllers/authentication');

/* GET game listings. */
router.get('/', GC.listGames);

// get relevant game home page
router.get('/:game/', GC.activeGames);

// create a game of type :game and host it
router.post('/:game/create/', GC.createGame);

// join an existing game
router.post('/:game/join/:id/', GC.joinGame);

// play an existing game (instanciated after create/join phase)
// only the host should do this.
router.post('/:game/game/:id', GC.startGame);

// gets the game in play
router.get('/:game/game/:id', GC.getGame);

// make a game inactive, must already be active.
router.post('/:game/close/:id', GC.closeGame);

module.exports = router;
