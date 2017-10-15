#! /usr/bin/env node

if (process.argv[2]) {
   DB_URL = process.argv[2];
} else {
   DB_URL = 'test'
}

const async = require('async'),
      db    = require('./model/db')(DB_URL),
      Game = require('./model/game'),
      User = require('./model/user')

let games = []
let users = []

function adminCreate(name, userName, fbID, callback) {
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

function gameCreate(name, stub, description, maxPlayers, callback) {
  let game = new Game({
    name: name,
    stub: stub,
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
             "Battle to color the board",
             "A sweet two player squarefest made by the creators of nodeboard",
             2,
             callback
          )
        },
        (callback) => {
          gameCreate(
             'GoT',
             "Claim the Iron Throne",
             "King Robert Baratheon is dead, and the lands of Westeros brace for battle." +
              " Can you claim the Iron Throne? Designed for ages 14 and up, " +
              "A Game of Thrones: The Board Game Second Edition is a classic game " +
               "of warfare, diplomacy, and intrigue for three to six players.",
             6,
             callback
          )
        },
        (callback) => {
          gameCreate(
             'Settlers of Catan',
             "Collect. Build. Conquer.",
             "The Settlers of Catan from Mayfair Games is an award-winning " +
              "strategy game where players collect resources and use them " +
              "to build roads, settlements and cities on their way to victory. " +
               "The board itself is variable, making each game a little different " +
                "from the next.",
             4,
             callback
          )
       },
       (callback) => {
         gameCreate(
            'Risk',
            "A game of global domination",
            "Risk is a strategy board game of diplomacy, conflict and conquest" +
            " for two to six players. The standard version is played on a board " +
            "depicting a political map of the earth, divided into forty-two " +
            "territories, which are grouped into six continents.",
            6,
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
        adminCreate('Alex Hinds', 'DarkPurple141', 10155846485352642, callback)
      },
      (callback) => {
        adminCreate('Zain Afzal', 'zainafzal08', 6, callback)
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
