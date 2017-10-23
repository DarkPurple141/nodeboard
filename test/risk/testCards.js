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

      // important so as to be able to send json versions of cards
      it('Equals with same attribute Object', function() {
         assert.equal(testCard.equals(testObj), true)
      })

    })
})

describe('Deck', function() {
   let testDeck,
       onlyWilds

   beforeEach(() => {
      testDeck = new Cards.Deck(["Alistan"])
      onlyWilds = new Cards.Deck([])
   })

   describe('#getters', function() {
      it('empty', function() {
         let top = testDeck.topCard
         assert.equal(
            top.equals({territory: "Wildcard", value: 3}) ||
            top.equals({territory: "Alistan", value: 0}), true)
      })

      it('onlyWilds', function() {
         let top = onlyWilds.topCard
         assert.equal(top.equals({territory: "Wildcard", value: 3}), true)
      })
   })

   describe('#size', function() {
      it('empty', function() {
         assert.equal(testDeck.size, 3)
      })

      it('onlyWilds', function() {
         assert.equal(onlyWilds.size, 2)
      })
   })

})
