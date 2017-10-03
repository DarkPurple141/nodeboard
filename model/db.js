
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const DB_URL = 'mongodb://localhost:27017/'

module.exports = url => {

  mongoose.connect(DB_URL + url, {
    useMongoClient: true, // config options
    promiseLibrary: global.Promise
  })

  const db = mongoose.connection;

  // mongodb error automatically logged
  db.on('error', console.error.bind(console, 'connection error:'));

  // mongodb connection open
  db.once('open', () => {
    console.log(`Connected to Mongo at: ${new Date()}`)
  });

  // when the app closes, so should the db connection
  process.on('SIGINT', function() {
    db.close(function () {
      console.log(`Disconnected from Mongo at: ${new Date()}`)
      process.exit(0);
    });
  });

  // adding models
  require('./game')
  require('./user')
  require('./gameInstance')

  console.log("Database initialised.. waiting for connections.")
  return db
}
