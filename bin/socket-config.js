
module.exports = (io, name) => {

   // create nameSpace for relevant game
   const nsp = io.of(name)
   nsp.rooms = {}

   nsp.on('connection', client => {
     console.log(`Someone connected to nameSpace : ${name}`)
     client.emit('hi', 'everyone!')

     // handle room choice
     client.on('joinRoom', gameID => {
        client.join(gameID)
     })

     // chat message
     client.on('message', msg => {

        console.log(msg)
     })

     // client has actively left the room
     client.on('leaveRoom', () => {
        if (client.room) {
           client.leave(client.room)
        }
     })

     client.on('update', (data) => {
       nsp.emit('update', data)
       console.log(data)
     })

     client.on('disconnect', () => {
        // TODO decide whether this is the best idea.
        if (client.room) client.leave(client.room)
        console.log("User disconnected")
     })
  })

  return nsp
}
