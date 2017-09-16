/*
https://scotch.io/bar-talk/using-mongoosejs-in-node-js-and-mongodb-applications
*/

const mongoose = require('mongoose')

// create a schema
const userSchema = new mongoose.Schema({
  name: String,
  fbId: {
    type: Number,
    required: true,
    unique: true
  },
  name: String,
  activeGame: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game'
  }, // if a logout occurs can fetch gameID
  admin: Boolean,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: Date
  /* Things we don't strictly need atm
  password: { type: String, required: true },
  meta: {
    age: Number,
    website: String
  },
  */
})

// add our own methods to user later

// the schema is useless so far
// we need to create a model using it
const User = mongoose.model('User', userSchema)

// make this available to our users in our Node applications
module.exports = User
