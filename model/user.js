/*
https://scotch.io/bar-talk/using-mongoosejs-in-node-js-and-mongodb-applications
*/

const mongoose = require('mongoose')

// create a schema
const userSchema = new mongoose.Schema({
  fbId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  userName: String,
  activeGame: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GameInstance'
  }, // if a logout occurs can fetch gameID
  admin: {
    type: Boolean,
    default: false
  },
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
// on every save, add the date
userSchema.pre('save', function(next) {
  let currentDate = Date.now()

  // change the updated_at field to current date
  this.updated_at = currentDate

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;
  console.log(`${this.name} record saved`);
  next();
});

// the schema is useless so far
// we need to create a model using it
const User = mongoose.model('User', userSchema)

// make this available to our users in our Node applications
module.exports = User
