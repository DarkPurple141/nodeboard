const NUM_CARD_TYPES = 3

class Card {
   constructor(territory, value) {
      this._territory = territory
      this._value = value
   }

   get value() {
      return this._value
   }

   get territory() {
      return this._territory
   }

   equals(otherCard) {
      return this._territory === otherCard.territory &&
             this._value === otherCard.value
   }
}

class Collection {

   constructor() {
      this._cards = []
   }

   get size () {
      return this._cards.length;
   }

   addCard(card) {
      this._cards.push(card)
   }

   addCards(cards) {
      this._cards.push(...cards)
   }

   removeCard(card) {
      this._cards = this._cards.filter(item => !(item.equals(card)))
      return card
   }

   shuffle() {
      this._cards = shuffle(this._cards)
   }

}

class Hand extends Collection {
   constructor() {
      super()
   }

   get cards() {
      return this._cards
   }
}

class Deck extends Collection {
   constructor(names) {
      super()
      this._cards = names.map((name, i) => {
         return new Card(name, i % NUM_CARD_TYPES)
      })

      this._cards.push(new Card("Wildcard", 3))
      this._cards.push(new Card("Wildcard", 3))

      this.shuffle()
   }

   get topCard() {
      return this._cards.pop()
   }
}

// https://github.com/coolaj86/knuth-shuffle

function shuffle(array) {
  let currentIndex = array.length,
      temporaryValue,
      randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

exports.Deck = Deck
exports.Hand = Hand
exports.Card = Card
exports.shuffle = shuffle
