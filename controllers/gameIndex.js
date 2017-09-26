
const Games = require('../model/game')
/*
Potential template code from
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data
*/

// PROCESS AS FOLLOWS
// game => create -> makes new gameid for game -> redirects to gameFront

// game => join -> check if id exists if exists -> route to game

// game => isX user allowed to join? join. else -> route back to game.

function singleGameList (search, callback) {
    Games.findOne(
      { urlkey : search }
    )
    .populate('activeGames')
    .exec(function(err, data) {
      if (err) throw err
      console.log(data)
      callback(data)
    })
}

const gameIndex = {

  // Displays list of all games in the db.
  gameList : function(callback) {
      Games.find(function(err, data) {
        if (err) throw err
        console.log(data)
        callback(data)
      })
  },

  activeGames : function(req, res, next) {
    console.log(`Looking for active ${req.params.game} games.`)
    singleGameList(req.params.game, function(data) {
      res.render('join-create', {
        title: `Play ${data.name}`,
        games: data.activeGames.map(function (obj) {
          let o = {
              createdAt: obj.createdAt,
              numPlayers: obj.players.length,
              id: obj._id
          }
          return o;
        })
      })
    })
  },

  /**
  NEXT BEING CALLED as route handlers don't do anythng.
  **/
  // Create ID of game to be created, host takes gameID
  createGame : function(req, res, next) {
      console.log(`Create ${req.params.game}`);
      next();
  },

  // Join gameID of game, else
  joinGame : function(req, res, next) {
      console.log(`Join ${req.params.game}`);
      next();
  },

  // Play the game if it exists
  playGame : function(req, res, next) {
      console.log(`Play ${req.params.game}`);
      next();
  }

}


module.exports = gameIndex;
