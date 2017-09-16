/*
Adapted from here.
https://scotch.io/bar-talk/using-mongoosejs-in-node-js-and-mongodb-applications
*/

const mongoose = require('mongoose')

// create a schema
const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  private: {
    type: Boolean,
    default: false
  },
  active : Boolean, // game in play or not
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  state: {}, // a gameObj
  created_at: Date,
  updated_at: {
    type: Date,
    default: Date.now
  }
})

// the schema is useless so far
// we need to create a model using it
const Game = mongoose.model('Game', gameSchema)

// make this available to our users in our Node applications
module.exports = Game
