const Hand = require('./cards').Hand;

class Player {
   constructor() {
      this._hand = new Hand()
   }

   addCardToHand(card) {
      this._hand.addCard(card)
   }
}

module.exports = Player
