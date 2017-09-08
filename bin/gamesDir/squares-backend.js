
const Squares = (socketObject) => {

  const nsp = socketObject.of('/squares');

  nsp.on('connection', function(socket){
    console.log('SQUARES: someone connected');
    socket.emit('hi', 'everyone!');
  });
  // singleton
  const game = {
    // other things that the game object should do

    this.connection = nsp;
  }

  return game;
}

module.exports = Squares;
