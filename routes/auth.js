const express = require('express');
const mongoose = require('mongoose');

module.exports = (passport) => {
  const router = express.Router();
  const FacebookStrategy = require('passport-facebook').Strategy;
  const User = mongoose.model('User');

  // passport configuration for facebook
  // NOTE: 'done' is just the callback function given

  passport.serializeUser( function( user, done) {
      //nothing to do here as we use the username as it is
      done( null, user );
  } );

  passport.deserializeUser( function( obj, done) {
      //again, we just pass the username forward
      done( null, obj );
  } );

  passport.use(new FacebookStrategy({
      clientID: '351111758660502',
      clientSecret: '46edebe1b6919e49142218485ca704e4',
      callbackURL: "http://127.0.0.1:3000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      // check if user exists
      console.log(profile)
      User.findOne({ fbId: Number(profile.id) }, function(err, data) {
        if (err) throw err;
        if (!data) {
          let user = new User({
            fbId  : profile.id,
            name  : profile.displayName,
            admin : false
          })
          // error occurs here thus entry is not saved
          user.save(function(err) {console.log(err)})
        } else {
          console.log(data)
          console.log(`Welcome back ${ data.name }`)
        }
      })
      return done(null,profile);
    }
  ));

  // Redirect the user to Facebook for authentication.
  // When complete, redirect the user back to the home page
  router.get('/facebook', passport.authenticate('facebook'));

  // Facebook will redirect the user to this URL after approval.
  router.get('/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/',
                                        failureRedirect: '/login'}));
  return router;
}
