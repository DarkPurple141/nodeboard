
// TODO eventually put passport in here too.

const path = require('path')

const auth = {
   login : function(req, res, next) {
      res.sendFile('/dist/index.html', {root : path.resolve('./public') })
   },
   logout : function(req, res, next) {
     req.logout();
     res.redirect('/');
   }
}

module.exports = auth;
