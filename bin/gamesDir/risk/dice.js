

class Dice {

   static roll() {
      return Math.ceil(Math.random() * 6)
   }

   static rollDice(rolls) {
      let r = []
      for (let i = 0; i < rolls; i++) r.push(this.roll())
      return r.sort((a, b) => b - a) // reverse order sort
   }
}

module.exports = Dice
