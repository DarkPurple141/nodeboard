const mongoose = require('mongoose')

// create a schema
const gameSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    unique: true
  },
  description : {
    type: String,
    required: true
  },
  urlkey: {
    type: String,
    required: true,
    unique: true
  },
  maxPlayers : {
     type: Number,
     required: true,
     default: 4
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
    return `/play/${this.name}/`;
})

gameSchema.pre('save', function(next) {
  let currentDate = Date.now()
  // change the updated_at field to current date
  this.updated_at = currentDate
  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;
  next();
});

const Game = mongoose.model('Game', gameSchema)
module.exports = Game
