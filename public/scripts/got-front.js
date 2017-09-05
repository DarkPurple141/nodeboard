function Game(socket) {
  this.userName = "Anon";
  this.socket = socket;
  this.players = [];
}

Game.prototype.x = function () {
  console.log("load");
  this.socket.emit('game-event', {gameState: "Nice" });
};

var socket = io.connect('http://localhost:3000');
var game = new Game(socket);

socket.on('news', function (data) {
  console.log(data);
  //socket.emit('my other event', { my: 'data' });
});

socket.on('update', function (data) {
  console.log("updating!");
});

window.game = game;
