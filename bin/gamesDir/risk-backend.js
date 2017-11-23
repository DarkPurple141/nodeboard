
const Risk = require('./risk/game')

let lobbies = []

// might make this into a class later
function newRoom(roomID, hostID) {
   let roomObj = {
      players: [hostID],
      room: roomID,
      game: null
   }
   return roomObj
}

function getRoom(roomID) {
   return lobbies.find(item => item.room == roomID)
}

function getPlayerIndexInRoom(room, clientID) {
   return room.players.indexOf(clientID)
}


module.exports = (io) => {

   // once in game lobby, chat enabled
   // roomid provided by param.
   console.log("Initialising Risk backend...")
   io.on('connection', client => {
     console.log(`Someone connected to nameSpace : Risk`)

     // request info
     client.emit('connectionReport')

     // create room or join existing room
     client.on('connectionReport', data => {
        let room = getRoom(data.room)
        if (room != undefined) {
          if (client.room && client.room === data.room) {
             // FIXME Should check that user didn't just refresh browser
             // done by enforcing playerID mapping to socketID.
             // if socket disconnects, but playerID is the same, map playerID
             // to new socketID.
             client.broadcast.to(data.room).emit('message',
              {
                 from: "System",
                 msg: `${data.user} rejoined room`
              })
          } else {
             room.players.push(client.id)
             // send news to others
             client.broadcast.to(data.room).emit('message',
              {
                 from: "System",
                 msg: `${data.user} joined room`
              })
              console.log("Join exisiting room: ", data.room)

          }

        } else {
           // first person to join
           console.log("First person to join room: ", data.room)
           lobbies.push(newRoom(data.room, client.id))
        }

        // add .room id to client object for later
        client.room = data.room
        client.join(data.room)
        if (room) console.log(room.players)
         client.emit('user', getPlayerIndexInRoom(getRoom(data.room), client.id))
     })

     // chat message
     client.on('message', msg => {
        client.broadcast.to(client.room).emit('message', msg)
        console.log(`FROM ${client.id}: ` + msg)
     })

     // client has actively left the room
     client.on('leaveRoom', () => {
        if (client.room) {
           console.log("Leaving room")
           client.leave(client.room)
        }
     })

     // begin the game
     client.on('start', () => {
        console.log("Beginning new game...")
        let roomObj = getRoom(client.room)
        roomObj.game = new Risk(roomObj.players.length)
        let gameData = {}
        gameData.board = roomObj.game.board.boardState()
        gameData.turn = Math.floor(Math.random()*roomObj.game.players.length) // change later
        gameData.numPlayers = roomObj.game.players.length

        io.in(client.room).emit('start', gameData)
     })

     // send a game update
     client.on('update', (data) => {
       console.log(data)

       // FIXME process data

       // eventually send only relevant update
       for (let i = 0; i < roomObj.players.length; i++) {
          client.broadcast.to(roomObj.players[i]).emit('update', data)
       }
     })

     // player has disconnected for an unknown reason, or they just quit
     client.on('disconnect', () => {
        // TODO decide whether this is the best idea.
        // ie maybe don't boot user from record so they can easily rejoin
        //if (client.room) client.leave(client.room)
        console.log("User disconnected")
        client.broadcast.to(client.room).emit('disconnectEvent', client.id)
     })
  })

  return io
}
