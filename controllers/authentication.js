
// TODO eventually put passport in here too.

const path = require('path')

const auth = {

   // nodeboard/api/login/
   login : function(req, res, next) {
      res.status(200).send(req.user)
   },

   // nodeboard/api/logout/
   logout : function(req, res, next) {
     req.logout();
     res.redirect('/');
   },

   // nodeboard/api/error/
   error : function(req, res, next) {
      res.status(401).send("Nothing")
   }
}

module.exports = auth;
