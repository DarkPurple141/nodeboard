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
   CANNON : 5
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

   endTurn() {
      this._turn++
   }

   getTurnExtras() {
      let numTerr = this.players[this.player].territories.length
      let normalExtras = Math.max(Math.floor(numTerr / 3), 3)
      let continentExtras = 0

      return normalExtras + continentExtras
   }

   _resolveAttack(fromRegion, targetRegion, attackStrength, loss) {
      if (targetRegion.units <= 0) {
         let moveValue = attackStrength - loss[0]
         this._players[targetRegion.owner].updateTerritories()
         this._players[fromRegion.owner].territories.push(targetRegion)
         targetRegion.owner = fromRegion.owner
         targetRegion.units = moveValue
         fromRegion.units -= moveValue
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
