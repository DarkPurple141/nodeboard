const Hand = require('./cards').Hand;

class Player {
   constructor(id, extras) {
      // access these directly
      this.id = id
      this.territories = []

      // not for these
      this._hand = new Hand()
      this._extras = extras
   }

   get extrasAvailable() {
      return this._extras
   }

   addExtras(newExtras) {
      this._extras += newExtras
   }

   placeExtras(numToPlace, region) {
      this._extras -= numToPlace
      region.units += numToPlace
   }

   updateTerritories() {
      this.territories = this.territories.filter(item => item.owner === this.id)
   }

   getCardIndex(card) {
      this._hand.cards.forEach((val, index) => {
         if (val.equals(card)) {
            return index
         }
      })
      throw new Error("No such card in hand") // if no card
   }

   addCardToHand(card) {
      this._hand.addCard(card)
   }
}

module.exports = Player
