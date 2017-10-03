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
    type: "land",
    point: [3/5, 1/10]
  },
  {
    name : "Karhold",
    id : 2,
    neighbours: [1, 3, 4],
    icon: "crown",
    type: "land",
    point: [3.7/5, 1.4/10]
  },
  {
    name : "The Shivering Sea",
    id : 3,
    neighbours: [1, 2, 4, 6, 7, 8],
    icon: null,
    type: "sea",
    point: [4.5/5, 2/10]
  },
  {
    name : "Winterfell",
    id : 4,
    neighbours: [1, 2, 3, 5, 6, 9, 10],
    icon: ["crown", "barrel"],
    type: "garrison",
    harbor: 5,
    point: [2.5/5, 2/10]
  },
  {
    name : "Bay of Ice",
    id : 5,
    neighbours: [1, 4, 9, 11, 12, 13],
    icon: null,
    type: "sea",
    point: [0.5/5, 2/10]
  },
  {
    name : "White Harbor",
    id : 6,
    neighbours: [3, 4, 7, 8, 10],
    icon: null,
    type: "castle",
    point: [3/5, 3.1/10]
  },
  {
    name : "Widow's Watch",
    id : 7,
    neighbours: [3, 6, 8],
    icon: ["barrel"],
    type: "land",
    point: [3.5/5, 2.8/10]
  },
  {
    name : "The Narrow Sea",
    id : 8,
    neighbours: [3, 6, 7, 10, 14, 15, 16, 17, 27, 28],
    icon: null,
    type: "sea",
    point: [4/5, 4/10]
  },
  {
    name : "The Stoney Shore",
    id : 9,
    neighbours: [4, 5],
    icon: ["barrel"],
    type: "land",
    point: [1.2/5, 3/10]
  },
  {
    name : "Moat Calin",
    id : 10,
    neighbours: [4, 6, 8, 11, 14, 19],
    icon: ["barrel"],
    type: "land",
    point: [2.5/5, 3.5/10]
  }
]

const SIZE = 640;

export const config = {
  WIDTH: SIZE,
  HEIGHT: 2*SIZE,
  CENTRE: {
    x: SIZE/2,
    y: SIZE
  },
  VIEWBOX: {
    x: SIZE,
    y: SIZE
  }
}

export function GameView(socket, userName) {
  this.userName = "" || userName
  this.socket = socket
  this.players = []
  this.regions = regions
  this.selection = null
}

GameView.prototype.selector = function (arg) {
  this.selection = arg;
}

GameView.prototype.confirm = function () {
  console.log("load")

  this.socket.emit('game-event',
  {
    region: this.regions[this.selection].name,
    gameState: "Nice"
  })
}
