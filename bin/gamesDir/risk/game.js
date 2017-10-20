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
         this._players.push(new Player())
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

   determineRollOutcome(attackRolls, defenseRolls) {
      let losses = [0, 0]
      let a = this._dice.rollDice(attackRolls)
      let d = this._dice.rollDice(defenseRolls)

      for (let i = 0; i < Math.min(attackRolls, defenseRolls); i++) {
         a[i] > d[i] ? losses[1]++ : losses[0]++
      }
      console.log(a)
      console.log(d)

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
      if (d.units <= 0) {
         let moveValue = attackStrength - loss[0]
         d.owner = a.owner
         d.units = moveValue
         a.units -= moveValue
      }
   }

   endTurn() {
      this._turn++
   }

   print () {
      console.log(util.inspect(this._deck, { showHidden: false, colors: true }))
   }
}

let a = new Risk(3)

a.print()
// console.log(a.determineRollOutcome(3, 2))
console.log(a.attack("Siam", "India", 3))
