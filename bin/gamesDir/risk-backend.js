
const Risk = require('./risk/game')

module.exports = (socketObject) => {
   const nsp = socketObject.of('/risk')

   nsp.on('connection', function(socket){
     console.log('RISK: someone connected')
     socket.emit('hi', 'everyone!')

     socket.on('update', (data) => {
       nsp.emit('update', data)
       console.log(data)
     })

   })
}
