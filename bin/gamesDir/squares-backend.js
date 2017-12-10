const Squares = (socketObject) => {

  /*
  const nsp = socketObject.of(name);

  nsp.on('connection', function(socket){
    console.log('SQUARES: someone connected');
    socket.emit('hi', 'everyone!');

    socket.on('update', (data) => {
      nsp.emit('update', data);
      console.log(data);
    })

  });
  */
  // singleton
  const game = {
    // other things that the game object should do
    connection : socketObject
  }

  return game;
}

module.exports = Squares;
