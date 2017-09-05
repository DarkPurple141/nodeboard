const CARDS = 10;

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items The array containing the items.
 */
function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

const Deck = function() {
  this.cards = [0, 0, 0, 1, 1, 1, 2, 2, 2, 3];
}

Deck.prototype = {
  get card() { return cards.pop() },
  init: () => { shuffle(cards) }
}

const Deck1 = function () {
  Deck.call(this);
}

const Deck2 = function () {
  Deck.call(this);
}

const Deck3 = function () {
  Deck.call(this);
}


const Game = function (id) {
    const _id = id
    const _cards = [new Deck1(), new Deck2(), new Deck3()]
    const _cardIndex = 0
    const _round = 0

    return {
      get round() { return _round },
      get cardIndex() { return _cardIndex },
      set cardIndex(val) { _cardIndex = (_cardIndex + val) % _cards.length},
      init : () => {
        // initialise decks
        for (let deck in this._cards) {
          deck.init();
        }
        /*Do some more stuff*/
      },

      draw : () => {
        return cards[cardIndex++].card;
      }
    }
}

const gameServer = function (io) {

  const players = {};
  const games = [];

  io.on('connection', function (socket) {

    players[socket.id] = socket;
    socket.emit('news', { hello: 'world' });

    socket.on('game-event', function (data) {
      console.log(socket.id);
      console.log(data);
      if (!(socket.id in players)) {
        let g = new Game();
        g.init();
        games.push(g);
      } else {
        let g = new Game();
        g.init();
        games.push(g);
      }

      socket.emit('update' , data);
    });

    socket.on('create', function(gameName) {
      console.log("Make a new lobby");
    });

    socket.on('join', function(gameId) {
      console.log(socket.id + "wants to join" + gameId);
    });

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
      socket.broadcast.emit('chat message', msg);
    });
  });

}

module.exports = gameServer;
