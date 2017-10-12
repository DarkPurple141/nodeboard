const path = require('path')

const api = {
   getUser : function(req, res, next) {
     // processes info from passport.js
     if (req.user) {
        res.json(req.user)
     } else {
        console.log("No user logged in!")
        res.redirect('/')
     }
  },

  loggedIn : function (req, res, next) {
     if (req.user) {
        // if loggedIn, allow normal api access
        next()
     } else {
        console.log("No user associated with session; redirecting")
        serveHome(req, res, next)
     }
  },

   serveHome : function (req, res, next) {
      if (req.user) {
         res.sendFile('/dist/app.html', {root : path.resolve('./public') })
      } else {
         res.sendFile('/dist/index.html', {root : path.resolve('./public') })
      }
   }
}

module.exports = api;
