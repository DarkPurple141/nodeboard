#! /usr/bin/env node

const DB_URL = 'nodeboard'

const async = require('async'),
      mongoose = require('mongoose'),
      db    = require('./model/db')(mongoose, DB_URL),
      Game = require('./model/game')

let games = []

function gameCreate(name, callback) {
  let game = new Game({
    name: name,
    urlkey: name.toLowerCase().split(' ').join('-')
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
          gameCreate('Squares', callback)
        },
        function(callback) {
          gameCreate('GoT', callback)
        },
        function(callback) {
          gameCreate('Settlers of Catan', callback)
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
