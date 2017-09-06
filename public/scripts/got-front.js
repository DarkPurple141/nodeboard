/**
This file is currently a total disaster.

Please avert your eyes.

Blame @DarkPurple141

**/


var regions = {
  "cb" : {
    name : "Castle Black",
    id : 1,
    neighbours: [2, 3, 4, 5],
    icon: "crown",
    type: "land"
  },
  "kh" : {
    name : "Karhold",
    id : 2,
    neighbours: [1, 3, 4],
    icon: "crown",
    type: "land"
  },
  "ss" : {
    name : "The Shivering Sea",
    id : 3,
    neighbours: [1, 2, 4, 6, 7, 8],
    icon: null,
    type: "sea"
  },
  "wf" : {
    name : "Winterfell",
    id : 4,
    neighbours: [1, 2, 3, 5, 6, 9, 10],
    icon: ["crown", "barrel"],
    type: "garrison",
    harbor: 5
  },
  "bi" : {
    name : "Bay of Ice",
    id : 5,
    neighbours: [1, 4, 9 ],
    icon: null,
    type: "sea"
  }
}


var map = $('div#map');

for (var reg in regions) {
  var curr = regions[reg];
  console.log(curr);
  var $div = $("<div>", { id: curr['id'], "class": "region"});
  $div.text(curr['name']);
  map.append($div);
}


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
