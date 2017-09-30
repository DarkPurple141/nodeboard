const express = require('express');
const router = express.Router();
const GC = require('../controllers/gameIndex');

/* GET game listings. */
router.get('/', GC.listGames);

// get relevant game home page
router.get('/:game/', GC.activeGames);

// create a game of type :game and host it
router.post('/:game/create/', GC.createGame);

// join an existing game
router.post('/:game/join/:id/', GC.joinGame);

// play an existing game (instanciated after create/join phase)
router.post('/:game/game/:id', GC.playGame);

// make a game inactive, must already be active.
router.post('/:game/close/:id', GC.closeGame);

module.exports = router;
