
const Games = require('../model/game')
const Instance = require('../model/gameInstance')
const User = require('../model/user')
/*
Potential template code from
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data
*/

// PROCESS AS FOLLOWS
// game => create -> makes new gameid for game -> redirects to gameFront

// game => join -> check if id exists if exists -> route to game

// game => isX user allowed to join? join. else -> route back to game.

// bring up the current active games for x, and remove any that have expired.
function singleGameList (search, callback) {
    Games.findOne(
      { urlkey : search }
    )
    .populate('activeGames')
    .exec(function(err, data) {
      if (err) throw err
      console.log(data)
      data.activeGames = data.activeGames.filter(function(item) {
         return item.active === true;
      })
      data.save(function() {
         callback(data)
      })
    })
}

// TODO should backend assume request is valid or not?
function addPlayerToGame(gameID, userID, callback) {
   Instance.findOne(
      { _id : gameID })
   .populate('game')
   .exec(function(gameError, gameInstance) {
      if (gameInstance.players.length >= gameInstance.game.maxPlayers) {
         let fullError = Error("Game Full")
         callback(fullError)
      } else {
         // TODO check if player already in game?
         User.findOneAndUpdate(
            { fbId: userID },
            { activeGame: gameInstance._id },
            function(userError, userToUpdate) {
               gameInstance.save(gameInstance.players.push(userToUpdate._id))
               callback(userError)
            })
      }
   })
}

// Make a new game of x.
function singleGame (gameObj, callback) {
   console.log(`Making new ${gameObj.name} instance`);
   let instance = new Instance({
      game: gameObj._id,
      name: gameObj.name,
      active: true
   })
   callback(instance);
}

// update the db to reflect the game ending.
function endGame (gameID, callback) {
   Instance.findOneAndUpdate(
      { _id: gameID },
      { active: false },
      function(error) {
         callback(error);
      }
   )
}

// bring up all the games in the db
function gameList(callback) {
    Games.find(function(err, data) {
      if (err) throw err
      console.log(data)
      callback(data)
    })
}

const gameIndex = {

  // Displays list of all games in the db.
  listGames : function(req, res, next) {
    gameList(function(games) {
      res.render('home', {
        title: "NodeBoard Play",
        games: games.map(obj => obj.name)
      })
    })
  },

  // display active games for given game
  activeGames : function(req, res, next) {
    console.log(`Looking for active ${req.params.game} games.`)
    singleGameList(req.params.game, function(data) {
      console.log(data)
      res.render('join-create', {
        title: `Play ${data.name}`,
        games: data.activeGames.map(function (obj) {
          console.log(obj)
          let o = {
              createdAt: obj.created_at,
              numPlayers: obj.players.length,
              id: obj._id
          }
          return o;
        })
      })
    })
  },

  // Create ID of game to be created, host takes gameID
  createGame : function(req, res, next) {
      console.log(`Create ${req.params.game}`);
      Games.findOne({
         urlkey: req.params.game
      }, function(err, data) {
         if (err) throw err;
         singleGame(data, function(gameObj) {
            gameObj.save(function() {
               data.save(data.activeGames.push(gameObj._id))
            })
         })
         res.redirect(`/play/${req.params.game}/`)
      })
  },

  // Join gameID of game, else
  joinGame : function(req, res, next) {
      console.log(`Attempting to join ${req.params.game}`);
      addPlayerToGame(req.params.id, req.user.id, function(err) {
         if (err) {
            next(err)
         } else {
            // TODO eventually should direct to lobby.
            console.log(`Join ${req.params.game} successful.`)
            res.redirect(`/play/${req.params.game}/`)
         }
      })
  },

  // TODO
  // Play the game if it exists
  playGame : function(req, res, next) {
      console.log(`Play ${req.params.game}`);
      next();
  },

  // called after game ends, or if game lobby is closed.
  closeGame : function(req, res, next) {
     console.log(`Close ${req.params.game}`);
     endGame(req.params.id, function(err) {
        if (err) next(err);
        console.log("Game closed successfully")
        res.redirect(`/play/${req.params.game}/`)
     })
   }
}


module.exports = gameIndex;
