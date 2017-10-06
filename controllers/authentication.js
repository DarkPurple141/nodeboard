
// TODO eventually put passport in here too.

const path = require('path')

const auth = {
   login : function(req, res, next) {
      res.status(200).send(req.user)
   },
   logout : function(req, res, next) {
     req.logout();
     res.redirect('/');
   }
   error : function(req, res, next) {
      res.status(401).send("Nothing")
   },
}

module.exports = auth;
