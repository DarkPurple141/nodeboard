
// TODO eventually put passport in here too.

const auth = {
   login : function(req, res, next) {
      res.render('base', {
        app: "login",
        layout: false
      });
   },
   logout : function(req, res, next) {
     req.logout();
     res.redirect('/');
   }
}

module.exports = auth;
