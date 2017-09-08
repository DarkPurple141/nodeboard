
const Squares = (socketObject) => {
  // client side code
  const nsp = socketObject.of('/squares');

  nsp.on('connection', function(socket){
    console.log('SQUARES: someone connected');
    socket.emit('hi', 'everyone!');
  });
}

module.exports = Squares;
