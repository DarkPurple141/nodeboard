const Dice = require('../../bin/gamesDir/risk/dice')
const assert = require('assert')

describe('Dice', function() {
   describe('#roll()', function() {
      it('Standard roll', function() {
         let roll = Dice.roll()
         assert.equal(roll <= 6 && roll > 0, true)
       })
    })

    describe('#rollDice()', function() {
      it('Roll two dice', function() {
        let rolls = Dice.rollDice(2)
        assert.equal(rolls.length, 2)
        let sortedRolls = rolls.sort((a, b) => b - a)
        rolls.forEach((value, index) => {
           assert.equal(value <= 6 && value > 0, true)
           assert.equal(value, sortedRolls[index])
        })
      })
      it('Roll three dice', function() {
         let rolls = Dice.rollDice(3)
         assert.equal(rolls.length, 3)
         let sortedRolls = rolls.sort((a, b) => b - a)
         rolls.forEach((value, index) => {
            assert.equal(value <= 6 && value > 0, true)
            assert.equal(value, sortedRolls[index])
         })
      })

    })
})
