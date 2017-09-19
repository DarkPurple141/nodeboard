const mongoose = require('mongoose'),
      GameInstance = mongoose.model('game')

const gameInstance = {
    // Display list of all Authors
  author_list : function(req, res) {
      res.send('NOT IMPLEMENTED: Author list');
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
