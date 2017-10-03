/*
Adapted from here.
https://scotch.io/bar-talk/using-mongoosejs-in-node-js-and-mongodb-applications
*/

const mongoose = require('mongoose')

// create a schema
const GameInstanceSchema = new mongoose.Schema({

  name: String,
  private: {
    type: Boolean,
    default: false
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true
  },
  active : {
    type: Boolean,
    default: true // game in play or not//joinable
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  // state: {}, // a gameObj
  created_at: {
     type: Date,
     default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
})

GameInstanceSchema
.virtual('url')
.get(function () {
    return `/play/${this.name}/game/${this._id}`;
});

GameInstanceSchema.pre('save', function(next) {
  let currentDate = Date.now()
  // change the updated_at field to current date
  this.updated_at = currentDate
  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;
  next();
});

// the schema is useless so far
// we need to create a model using it
const GameInstance = mongoose.model('GameInstance', GameInstanceSchema)

// make this available to our users in our Node applications
module.exports = GameInstance
