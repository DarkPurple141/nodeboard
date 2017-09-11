// static map information and Game Engine

const regions = [
  {
    id: 0
  },
  {
    name : "Castle Black",
    id : 1,
    neighbours: [2, 3, 4, 5],
    icon: "crown",
    type: "land"
  },
  {
    name : "Karhold",
    id : 2,
    neighbours: [1, 3, 4],
    icon: "crown",
    type: "land"
  },
  {
    name : "The Shivering Sea",
    id : 3,
    neighbours: [1, 2, 4, 6, 7, 8],
    icon: null,
    type: "sea"
  },
  {
    name : "Winterfell",
    id : 4,
    neighbours: [1, 2, 3, 5, 6, 9, 10],
    icon: ["crown", "barrel"],
    type: "garrison",
    harbor: 5
  },
  {
    name : "Bay of Ice",
    id : 5,
    neighbours: [1, 4, 9, 11, 12, 13],
    icon: null,
    type: "sea"
  },
  {
    name : "White Harbor",
    id : 6,
    neighbours: [3, 4, 7, 8, 10],
    icon: null,
    type: "castle",
  },
  {
    name : "Widow's Watch",
    id : 7,
    neighbours: [3, 6, 8],
    icon: ["barrel"],
    type: "land"
  },
  {
    name : "The Narrow Sea",
    id : 8,
    neighbours: [3, 6, 7, 10, 14, 15, 16, 17, 27, 28],
    icon: null,
    type: "sea"
  },
  {
    name : "The Stoney Shore",
    id : 9,
    neighbours: [4, 5],
    icon: ["barrel"],
    type: "land"
  },
  {
    name : "Moat Calin",
    id : 10,
    neighbours: [4, 6, 8, 11, 14, 19],
    icon: ["barrel"],
    type: "land"
  }
]

function Game(socket) {
  this.userName = "Anon"
  this.socket = socket
  this.players = []
}

Game.prototype.x = function () {
  console.log("load")
  this.socket.emit('game-event',
  {
    gameState: "Nice"
  })
}
