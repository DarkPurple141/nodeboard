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

function Deck() {
  this.cards = [0, 0, 0, 1, 1, 1, 2, 2, 2, 3];
  this.init = () => { shuffle(this.cards); };
}

Deck.prototype = {
  get card() { return this.cards.pop() }
}

function DeckOne() {
  console.log("Deck One")
  Deck.call(this);
}

function DeckTwo() {
  console.log("Deck Two")
  Deck.call(this);
}

function DeckThree() {
  console.log("Deck Three")
  Deck.call(this);
}

DeckOne.prototype = Object.create(Deck.prototype);
DeckTwo.prototype = Object.create(Deck.prototype);
DeckThree.prototype = Object.create(Deck.prototype);

const Game = function (id) {
    const _id = id
    let _cards = [new DeckOne(), new DeckTwo(), new DeckThree()]
    let _cardIndex = 0
    let _round = 0

    return {
      get round() { return _round },
      set round(val) { _round += val },
      get cardIndex() { return _cardIndex },
      set cardIndex(val) { _cardIndex = (_cardIndex + val) % _cards.length},
      init : function () {
        // initialise decks
        for (let deck in _cards) {
          _cards[deck].init();
        }
        /*Do some more stuff*/
      },

      draw : function () {
        return _cards[this.cardIndex++].card;
      }
    }
}

const gameServer = function (io) {

  const players = {};
  const games = [];
  const nsp = io;

  nsp.on('connection', function (socket) {

    socket.emit('news', { hello: 'world' });
    socket.on('game-event', function (data) {
      console.log(socket.id);
      console.log(data);
      let toSend = "New Game";
      if (!(socket.id in players)) {
        console.log("GAME CREATION")
        players[socket.id] = socket;
        let g = new Game();
        g.init();
        games.push(g);
      } else {
        toSend = games[0].draw();
        console.log(toSend)
      }

      socket.emit('update' , toSend);
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
      socket.broadcast.emit('chat message', msg) ;
    });
  });

  const server = {
    connection : nsp
  }

  return server;
}

module.exports = gameServer;
