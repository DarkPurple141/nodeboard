#! /usr/bin/env node

const DB_URL = 'nodeboard'

const async = require('async'),
      db    = require('./model/db')(DB_URL),
      Game = require('./model/game')

let games = []

function gameCreate(name, maxPlayers, callback) {
  let game = new Game({
    name: name,
    urlkey: name.toLowerCase().split(' ').join('-'),
    maxPlayers: maxPlayers
  });

  game.save(function (err) {
    if (err) {
      callback(err, null);
      return;
    }
    console.log('New Game: ' + game);
    games.push(game)
    callback(null, game);
  }   );
}

function createGames(callback) {
    async.parallel([
        function(callback) {
          gameCreate('Squares', 2, callback)
        },
        function(callback) {
          gameCreate('GoT', 6, callback)
        },
        function(callback) {
          gameCreate('Settlers of Catan', 4, callback)
        }
    ],
    // optional callback
    callback);
}

async.series([
    createGames
],
// optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Games: '+ games);
    }
    //All done, disconnect from database
    if (DB_URL === 'test') {
      db.dropDatabase();
    }
    db.close();
});
