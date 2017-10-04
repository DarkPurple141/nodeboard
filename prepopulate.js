#! /usr/bin/env node

const DB_URL = 'nodeboard'

const async = require('async'),
      db    = require('./model/db')(DB_URL),
      Game = require('./model/game'),
      User = require('./model/user')

let games = []
let users = []

function adminCreate(name, fbID, callback) {
   let user = new User({
      name: name,
      fbId: fbID,
      admin: true
   })
   user.save(function (err) {
      if (err) {
        callback(err, null);
        return;
      }
      console.log('New User: ' + user);
      users.push(user)
      callback(null, user);
   })
}

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
  })
}

function createGames(callback) {
    async.parallel([
        (callback) => {
          gameCreate('Squares', 2, callback)
        },
        (callback) => {
          gameCreate('GoT', 6, callback)
        },
        (callback) => {
          gameCreate('Settlers of Catan', 4, callback)
        }
    ],
    // optional callback
    callback)
}

function createAdmins(callback) {
   async.parallel([
      (callback) => {
        adminCreate('Alex Hinds', 10155846485352642, callback)
      },
      (callback) => {
        adminCreate('Zain Afzal', 6, callback)
      }
   ],

   // optional callback
   callback)
}

async.series([
    createGames,
    createAdmins
],
// optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Games: ' + games)
        console.log('Users: ' + users)
    }
    //All done, disconnect from database
    if (DB_URL === 'test') {
      db.dropDatabase();
    }
    db.close();
});
