
// TODO eventually put passport in here too.

const auth = {
   login : function(req, res, next) {
     //res.send('respond with a resource');
     res.render('login', {
       layout: 'login-layout',
       state: req.isAuthenticated() ? "Login" : "Logout",
       helpers: {
         capitalise : function(str) {
           return str[0].toUpper()
         }
       }
     })
   },
   logout : function(req, res, next) {
     req.logout();
     res.redirect('/');
   }
}

module.exports = auth;
