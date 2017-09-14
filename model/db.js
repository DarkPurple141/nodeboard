
module.exports = (MongoClient) => {

  const co = require('co')
  const DB_URL = 'mongodb://localhost:27017/nodeboard';

  co(function*() {
    const db = yield MongoClient.connect(DB_URL);
    console.log("Connected successfully to db server");
    yield updateGameState(db, 1, {'name' : 'Squares'});
    //yield insertDocuments(db, null);
    //yield findDocuments(db, null);
    //yield indexCollection(db, null);
    //yield aggregateDocuments(db, null);

    db.close();
  }).catch(err => console.log(err));

}

const updateGameState = (db, gameId, data) => {

  db.collection("games").updateOne(gameId, data, (err, res) => {
    if (err) throw err;
    console.log("1 document updated");
  })
}
