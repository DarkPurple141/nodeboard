/*
https://scotch.io/bar-talk/using-mongoosejs-in-node-js-and-mongodb-applications
*/

const mongoose = require('mongoose')

// create a schema
const userSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    required: true,
    unique: true
  },
  //password: { type: String, required: true }, // unlikely we need this?
  activeGame: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game'
  }, // if a logout occurs can fetch gameID
  admin: Boolean,
  meta: {
    age: Number,
    website: String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: Date
})

// add our own methods to user later

// the schema is useless so far
// we need to create a model using it
const User = mongoose.model('User', userSchema)

// make this available to our users in our Node applications
module.exports = User
