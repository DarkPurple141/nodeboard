
const Games = require('../model/game')
/*
Potential template code from
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data
*/

const gameIndex = {
  // Displays list of all games in the db.
  gameList : function(callback) {
      Games.find({}, function(err, data) {
        if (err) throw err
        console.log(data)
        callback(data)
      })
      //res.send('NOT IMPLEMENTED: Author list');
  },

  // Display detail page for a specific Author
  author_detail : function(req, res) {
      res.send('NOT IMPLEMENTED: Author detail: ' + req.params.id);
  },

  // Display Author create form on GET
  author_create_get : function(req, res) {
      res.send('NOT IMPLEMENTED: Author create GET');
  },

  // Handle Author create on POST
  author_create_post : function(req, res) {
      res.send('NOT IMPLEMENTED: Author create POST');
  }

}


module.exports = gameIndex;
