#! /usr/bin/env node

let DB_URL = 'test'

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

function gameCreate(name, description, maxPlayers, callback) {
  let game = new Game({
    name: name,
    description: description,
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
          gameCreate(
             'Squares',
             "A sweet two player squarefest made by the creators of nodeboard",
             2,
             callback
          )
        },
        (callback) => {
          gameCreate(
             'GoT',
             "King Robert Baratheon is dead, and the lands of Westeros brace for battle." +
              "Can you claim the Iron Throne? Designed for ages 14 and up, " +
              "A Game of Thrones: The Board Game Second Edition is a classic game" +
               "of warfare, diplomacy, and intrigue for three to six players.",
             6,
             callback
          )
        },
        (callback) => {
          gameCreate(
             'Settlers of Catan',
             "The Settlers of Catan from Mayfair Games is an award-winning" +
              "strategy game where players collect resources and use them " +
              "to build roads, settlements and cities on their way to victory." +
               "The board itself is variable, making each game a little different" +
                "from the next.",
             4,
             callback
          )
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

if (process.argv[2]) {
   DB_URL = process.argv[2];
} else {
   DB_URL = 'test'
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
