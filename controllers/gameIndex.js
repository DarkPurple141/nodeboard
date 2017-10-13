
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
function fullError() {
   let err = new Error("Current game is full")
   err.name = "fullError"
   return err;
}


function singleGameList (search, callback) {
    Games.findOne(
      { urlkey : search }
    )
    .populate('activeGames')
    .exec(function(queryError, game) {
      if (queryError) throw queryError;
      game.save(validationError => {
         if (validationError) throw validationError;
         game.activeGames = game.activeGames.filter(
            item => item.active === true)
         })
      .then(callback(game))
      .catch(promiseError => {
         console.error("Error occurred in singleGameList")
         })
      })
}

// TODO should backend assume request is valid or not?
function addPlayerToGame(gameID, userID, callback) {
   Instance.findOne(
      { _id : gameID })
   .populate('game')
   .exec()
   .then(gameInstance => {
      if (gameInstance.players.length >= gameInstance.game.maxPlayers) {
         throw fullError()
      }
      return gameInstance;
   })
   .then(gameInstance => {
      User.findOneAndUpdate(
         { fbId: userID },
         { activeGame: gameInstance._id },
         function(userError, userToUpdate) {
            if (userError) throw userError
            gameInstance.players.push(userToUpdate._id)
            gameInstance.save(() => {
               callback(null)
            })
            .catch(instanceUpdateError => {
               throw instanceUpdateError
            })
         })
      }
   )
   .catch(joinError => {
      if (joinError.name === "fullError") {
         callback(joinError)
      } else {
         throw joinError
      }
   })
}

// Make a new game of x.
function makeGame (gameObj, user, callback) {
   User.findOne({fbId : user}, function(err, userSearch) {
      if (err) console.error("No user associated with fbid")
      console.log(`Making new ${gameObj.name} instance`);
      let instance = new Instance({
         game: gameObj._id,
         name: gameObj.name,
         active: true,
         host: userSearch._id,
         players: [userSearch._id]
      })
      userSearch.activeGame = instance._id
      userSearch.save()
      .then(callback(instance))
      .catch(userSaveError => {
         console.error("Error occurred in makeGame");
      })
   })

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
      res.json({
        games: games
      })
    })
  },

  // display active games for given game
  activeGames : function(req, res, next) {
    console.log(`Active ${req.params.game} games queried..`)
    singleGameList(req.params.game, function(data) {
      res.json({
        title: `Play ${data.name}`,
        games: data.activeGames.map(obj => {
          let o = {
              createdAt: obj.created_at,
              numPlayers: obj.players.length,
              id: obj._id
          }
          return o;
       })})
    })
  },

  // Create ID of game to be created, host takes gameID
  createGame : function(req, res, next) {
      console.log(`Create ${req.params.game} from ${req.user.displayName}`)
      Games.findOne({
         urlkey: req.params.game
      }, function(searchError, game) {
         if (searchError) throw searchError;
         makeGame(game, Number(req.user.id), function(gameInstance) {
            gameInstance.save()
            .then(() => {
               game.activeGames.push(gameInstance._id)
               game.save(() => {
                  res.json({success: true})
                  //res.redirect(`/play/${req.params.game}/`)
               })
               .catch(saveErr => {
                  console.error("CreateGame Save Failed")
               })
            })
            .catch(createGameError => {
               console.error("CreateGame Failed")
            })
         })
      })
  },

  // Join gameID of game, else
  joinGame : function(req, res, next) {
      console.log(`Attempting to join ${req.params.game}`);
      addPlayerToGame(req.params.id, Number(req.user.id), function(err) {
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
  startGame : function(req, res, next) {
      console.log(`Play ${req.params.game}`);
      next();
  },

  // TODO
  // only available when game is in play
  // only possible if playerID already associated with gameID
  getGame : function(req, res, next) {
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
