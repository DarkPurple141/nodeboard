const mongoose = require('mongoose')

// create a schema
const gameSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    unique: true
  },
  created_at: Date,
  updated_at: {
    type: Date,
    default: Date.now
  },
  activeGames: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GameInstance'
  }]
})

gameSchema
.virtual('url')
.get(function() {
    return `/games/${this.name}/`;
})

const Game = mongoose.model('Game', gameSchema)
module.exports = Game
