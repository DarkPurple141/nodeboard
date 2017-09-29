const express = require('express');
const router = express.Router();
const GC = require('../controllers/gameIndex');

/* GET game listings. */
router.get('/', GC.listGames);

router.get('/:game/', GC.activeGames);

router.post('/:game/create/', GC.createGame);

router.post('/:game/join/:id/', GC.joinGame);

router.post('/:game/game/:id', GC.playGame);

module.exports = router;
