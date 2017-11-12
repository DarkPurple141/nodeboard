
const Risk = require('./risk/game')

let lobbies = []

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
           room.players.push(client.id)

           // send news to others
           client.broadcast.to(data.room).emit('message',
             {
                from: "System",
                msg: `${data.userName} joined room`
             })
              console.log("Join exisiting room: ", data.room)
        } else {
           // first person to join
           console.log("First person to join room: ", data.room)
           lobbies.push(newRoom(data.room, client.id))
        }

        client.room = data.room
        client.join(data.room)
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
        let roomObj = getRoom(client.room)
        roomObj.game = new Risk(roomObj.players.length)
        for (let i = 0; i < roomObj.players.length; i++) {
           let playerSpecificDataSlice = 0
           socket.broadcast.to(roomObj.players[i]).emit('update', playerSpecificDataSlice)
        }
     })

     // send a game update
     client.on('update', (data) => {
       console.log(data)
       client.broadcast.emit('update', data)
     })

     client.on('disconnect', () => {
        // TODO decide whether this is the best idea.
        // ie maybe don't boot user from record so they can easily rejoin
        if (client.room) client.leave(client.room)
        console.log("User disconnected")
        client.broadcast.to(client.room).emit('disconnectEvent', client.id)
     })
  })

  return io
}
