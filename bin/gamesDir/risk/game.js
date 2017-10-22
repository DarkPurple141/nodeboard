"use strict";

const util = require('util')
const Cards = require('./cards')
const Board = require('./map')
const Player = require('./player')
const Dice = require('./dice')
const Deck = Cards.Deck

const CONFIG = {
   CAVALRY: 2,
   INFANTRY: 1,
   CANNON : 5,
   THREE_CANNONS: 6,
   THREE_CAVALRY: 3,
   THREE_INFANTRY: 0,
}

class Risk {
   constructor(numPlayers) {
      this._players = []
      this._board = new Board()
      this._deck = new Deck(this._board.places)
      for (let i = 0; i < numPlayers; i++) {
         this._players.push(new Player(i, Risk.determineStartExtras(numPlayers)))
      }

      // shuffle keys (just for init so that map is spread)
      let keys = Cards.shuffle(this._board.places)
      let i = 0
      while (keys.length) {
         let key = keys.pop()
         let region = this._board.getRegion(key)
         region.owner = i % numPlayers
         this._players[region.owner].placeExtras(1, region)
         this._players[region.owner].territories.push(region)
         i++
      }
      this._dice = Dice
      this._turn = 0
      this._taken = false
   }

   get turn() {
      return this._turn
   }

   get player() {
      return this.turn % this._players.length
   }

   get players() {
      return this._players
   }

   determineRollOutcome(attackRolls, defenseRolls) {
      let losses = [0, 0]
      let a = this._dice.rollDice(attackRolls)
      let d = this._dice.rollDice(defenseRolls)

      for (let i = 0; i < Math.min(attackRolls, defenseRolls); i++) {
         a[i] > d[i] ? losses[1]++ : losses[0]++
      }

      return losses
   }

   /**
    * @param targetRegion   a key for the board
    * @param fromRegion     a key for the board
    * @param attackStrength a number > 0
   **/
   attack(fromRegion, targetRegion, attackStrength) {
      let a = this._board.getRegion(fromRegion)
      let d = this._board.getRegion(targetRegion)
      let dValue = Math.min(d.units, 2)
      let loss = this.determineRollOutcome(attackStrength, dValue)
      a.units -= loss[0]
      d.units -= loss[1]
      this._resolveAttack(a, d, attackStrength, loss)
   }

   /**
      Play a set of three cards
      @precondition cards in hand
    */
   playSet(cardA, cardB, cardC) {
      let sum = cardA.value + cardB.value + cardC.value
      let bonus = 0
      // assume no wilds
      switch (sum) {
         case config.THREE_CANNONS:
            bonus = 8
         break
         case config.THREE_CAVALRY:
            bonus = cardA.value != cardB.value ? 10 : 6
         break
         case config.THREE_INFANTRY:
            bonus = 4
         break
         default:
            throw new Error("Card Set failure")
      }

      this.players[this.player].addExtras(bonus)
      this._returnCardsToDeck(cardA, cardB, cardC)
   }

   // called at start of a new turn
   startTurn() {
      this.taken = false
      this.players[this.player].addExtras(this.getTurnExtras())
   }

   // called at end of turn
   endTurn() {
      if (this.taken) {
         this.players[this.player].addCardToHand(this._deck.topCard)
      }
      this._turn++
   }

   getTurnExtras() {
      let numTerr = this.players[this.player].territories.length
      let normalExtras = Math.max(Math.floor(numTerr / 3), 3)
      let continentExtras = this._board.getContinentBonuses(this.player)

      return normalExtras + continentExtras
   }

   _returnCardsToDeck(cardA, cardB, cardC) {
      let cards = []
      cards.push(this.players[this.player]._hand.removeCard(cardA))
      cards.push(this.players[this.player]._hand.removeCard(cardB))
      cards.push(this.players[this.player]._hand.removeCard(cardC))
      this._deck.addCards(cards)
      this._deck.shuffle()
   }

   _resolveAttack(fromRegion, targetRegion, attackStrength, loss) {
      if (targetRegion.units <= 0) {
         let moveValue = attackStrength - loss[0]
         this._players[targetRegion.owner].updateTerritories()
         this._players[fromRegion.owner].territories.push(targetRegion)
         targetRegion.owner = fromRegion.owner
         targetRegion.units = moveValue
         fromRegion.units -= moveValue
         this.taken = true
      }
   }

   static determineStartExtras(numPlayers) {
      let extras = 0
      switch (numPlayers) {
         case 2: extras = 40
         break
         case 3: extras = 35
         break
         case 4: extras = 30
         break
         case 5: extras = 25
         break
         case 6: extras = 20
         break
      }

      return extras
   }

   print () {
      console.log(util.inspect(this._board, { showHidden: false, colors: true }))
   }
}

let a = new Risk(3)

a.print()
// console.log(a.determineRollOutcome(3, 2))
console.log(a.attack("Siam", "India", 3))

module.exports = Risk
