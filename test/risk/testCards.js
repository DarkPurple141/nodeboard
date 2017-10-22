const Cards = require('../../bin/gamesDir/risk/cards')
const assert = require('assert')
const TEST_TERRITORY = "Greece"

describe('Card', function() {
   let testCard,
       testObj = {}
   before(() => {
      testCard = new Cards.Card(TEST_TERRITORY, 1)
      testObj.territory = TEST_TERRITORY
      testObj.value = 1
   })

   describe('#getters', function() {
      it('value', function() {
         assert.equal(testCard.value, 1)
       })

       it('territory', function() {
          assert.equal(testCard.territory, TEST_TERRITORY)
        })
    })

    describe('#equals()', function() {
      it('Equals with self', function() {
        assert.equal(testCard.equals(testCard), true)
      })
      it('Equals with same attribute Object', function() {
         assert.equal(testCard.equals(testObj), true)
      })

    })
})
