const Risk = require('../../bin/gamesDir/risk/game')
const assert = require('assert')


describe('Risk', function() {
  describe('#InitialGameState', function() {
    let game,
        numPlayers = 3

    before(() => {
      game = new Risk(3)
    })

    it('Check numPlayers', function() {
      assert.equal(game.players.length, numPlayers)
    })

    it('Check playerTurn', function() {
      assert.equal(game.player >= 0 && game.player < numPlayers, true)
    })

    it('Check numTerritories', function() {
      for (let i = 0; i < numPlayers; i++) {
         assert.equal(game.players[i].territories.length >= 42/numPlayers, true)
      }
    })

    it('Check numExtas', function() {
      for (let i = 0; i < numPlayers; i++) {
         assert.equal(
            game.players[i].extrasAvailable,
            Risk.determineStartExtras(numPlayers) - game.players[i].territories.length
         )
      }
    })

    it('Check numExtrasAvailable', function() {
      let numTerrs = game.players[0].territories.length/3
      numTerrs = Math.max(Math.floor(numTerrs), 3) + game.board.getContinentBonuses(0)
      assert.equal(game.getTurnExtras(), numTerrs)
    })

    it('Check Map properly loaded', function() {
      let places = game.board.places
      for (let place in places) {
         let region = game.board.getRegion(places[place])
         let parent = region._parent
         let found = false
         for (let child in parent.children) {
            if (parent.children[child].name === region.name) {
               found = true
               break
            }
         }
         assert.equal(found, true)
      }
    })

  })
})
