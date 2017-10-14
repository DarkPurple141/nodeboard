
// TODO eventually put passport in here too.

const path = require('path')

const auth = {

   // nodeboard/api/logout/
   logout : function(req, res, next) {
     req.logout();
     res.redirect('/');
   },

   // nodeboard/api/error/
   error : function(req, res, next) {
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
   }
}

module.exports = auth;
