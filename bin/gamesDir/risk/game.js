"use strict";

const util = require('util')
const Cards = require('./cards')
const Board = require('./board')
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
      this._deck = new Deck(this.board.places)
      for (let i = 0; i < numPlayers; i++) {
         this.players.push(new Player(i, Risk.determineStartExtras(numPlayers)))
      }

      // shuffle keys (just for init so that map is spread)
      let keys = Cards.shuffle(this.board.places)
      let i = 0
      while (keys.length) {
         let key = keys.pop()
         let region = this.board.getRegion(key)
         region.owner = i % numPlayers
         this.players[region.owner].placeExtras(1, region)
         this.players[region.owner].territories.push(region)
         i++
      }
      this._dice = Dice
      this._turn = 0
      this._taken = false
      console.log(`INIT: New risk game of ${numPlayers} created.`)
   }

   get turn() {
      return this._turn
   }

   // returns the index of the current player
   get player() {
      return this.turn % this.players.length
   }

   // returns the actual player object
   get currentPlayer() {
      return this.players[this.player]
   }

   get players() {
      return this._players
   }

   get board() {
      return this._board
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
    */
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

      this.currentPlayer.addExtras(bonus)
      this._returnCardsToDeck(cardA, cardB, cardC)
   }

   /**
      @param territories
      @type  Object
      @param player
      @type  should always be current player
   */
   placeExtras(player, territories) {
      for (let terr in territories) {
         this.players[player].placeExtras(
            territories[terr],
            this.board.getRegion(terr)
         )
      }
   }

   // called at start of a new turn
   startTurn() {
      this.taken = false
      this.currentPlayer.addExtras(this.getTurnExtras())
   }

   // called at end of turn
   endTurn() {
      let card = null
      if (this.taken) {
         card = this._deck.removeTopCard()
         this.players[this.player].addCardToHand(card)
         card = { value: card.value, territory: card.territory }
      }
      this._turn++

      return card
   }

   getTurnExtras() {
      let numTerr = this.currentPlayer.territories.length
      let normalExtras = Math.max(Math.floor(numTerr / 3), 3)
      let continentExtras = this.board.getContinentBonuses(this.player)

      return normalExtras + continentExtras
   }

   _returnCardsToDeck(cardA, cardB, cardC) {
      let cards = []
      cards.push(this.currentPlayer._hand.removeCard(cardA))
      cards.push(this.currentPlayer._hand.removeCard(cardB))
      cards.push(this.currentPlayer._hand.removeCard(cardC))
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
      console.log(util.inspect(this.board, { showHidden: false, colors: true }))
   }
}


module.exports = Risk
