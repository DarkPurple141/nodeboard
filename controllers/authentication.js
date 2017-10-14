
// TODO eventually put passport in here too.

const path = require('path')

const auth = {

<<<<<<< HEAD
   // nodeboard/api/login/
   login : function(req, res, next) {
      res.status(200).send(req.user)
   },

=======
>>>>>>> origin/experimental-changes
   // nodeboard/api/logout/
   logout : function(req, res, next) {
     req.logout();
     res.redirect('/');
   },

   // nodeboard/api/error/
   error : function(req, res, next) {
<<<<<<< HEAD
      res.status(401).send("Nothing")
   },

   // nodeboard/api/authStatus
   isLoggedIn: function(req, res, next) {
      if(req.user){
          res.status(200).send(true);
      }else{
          res.status(200).send(false);
      }
=======
      //res.sendStatus(401)
      next()
   },

   // cors
   corsHeaders: function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
     res.header("Access-Control-Allow-Credentials", true);
     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
     res.header("Access-Control-Allow-Headers",
     "Origin, X-Requested-With, Content-Type, Accept, authorization");
     next();
>>>>>>> origin/experimental-changes
   }
}

module.exports = auth;
