
const api = {
   getUser : function(req, res, next) {
     // processes info from passport.js
     // and passes it back in a nice form
     // that the front end can use.
     // TODO some of this is pretty meaningless wth new api.
     let response = {};
     if (req.isAuthenticated && req.user) {
       // Additional checks to make sure we access real user attributes.
       if (req.user.provider === "facebook") {
         response.name = req.user.displayName;
       } else {
         response.name = "ANON";
       }
   	  response.success = true;

     } else {
   	  response.success = false;
     }
     res.send(response);
   }
}

module.exports = api;