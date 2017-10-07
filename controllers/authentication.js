
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
   },

   // nodeboard/api/authStatus
   isLoggedIn: function(req, res, next) {
      if(req.user){
          res.status(200).send(true);
      }else{
          res.status(200).send(false);
      }
   }
}

module.exports = auth;
