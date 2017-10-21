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

   addCardToHand(card) {
      this._hand.addCard(card)
   }
}

module.exports = Player
