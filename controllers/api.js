const path = require('path')

const api = {
   getUser : function(req, res, next) {
     // processes info from passport.js
     if (req.user) {
        res.json(req.user)
     } else {
        console.log("No user logged in!")
        res.sendStatus(209)
     }
  },

  loggedIn : function (req, res, next) {
     if (req.user) {
        console.log("Valid api request ", req.user.name)
        // if loggedIn, allow normal api access
        next()
     } else {
        console.log("No user associated with session; redirecting")
        res.sendFile('/dist/index.html', {root : path.resolve('./public') })
     }
  },

   serveHome : function (req, res, next) {
      console.log("Request via home")
      res.sendFile('/dist/index.html', {root : path.resolve('./public') })
   }
}

module.exports = api;
