// imports
const
express = require('express'),
path = require('path'),
favicon = require('serve-favicon'),
logger = require('morgan'),
cookieParser = require('cookie-parser'),
bodyParser = require('body-parser'),
handlebars = require('express-handlebars').create(
  {defaultLayout: 'main'}),
passport = require('passport'),
session = require('express-session');

// app
module.exports = (dbname) => {

   const app = express();

   // these are all accessible within handlebars
   app.locals.site = {
     title: "NodeBoard",
     github_username: "DarkPurple141",
     github_username_other: "zainafzal08",
     email: "alex.hinds141@gmail.com",
     email_other: "zain.afz@gmail.com",
     twitter_username: "al_hinds"
   }

   // view engine setup
   app.set('views', path.join(__dirname, 'views'));
   app.engine('handlebars', handlebars.engine);
   app.set('view engine', 'handlebars');

   // uncomment after placing your favicon in /public
   //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
   app.use(logger('dev'));
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({ extended: false }));
   app.use(express.static(path.join(__dirname, 'public')));
   app.use(cookieParser('memes'));
   app.use(session({
     secret: 'memes',
     resave: false,
     saveUninitialized: true
   }));
   app.use(passport.initialize());
   app.use(passport.session());

   // model
   const db = require('./model/db')(dbname);

   // routes
   const index = require('./routes/index');
   const got = require('./routes/got');
   const squares = require('./routes/squares');
   const api = require('./routes/api');
   const auth = require('./routes/auth')(passport);
   const play = require('./routes/play');


   app.use('/api/', api);
   app.use('/auth/',auth);
   app.use('/*', index);

   // catch 404 and forward to error handler
   app.use(function(req, res, next) {
     let err = new Error('Not Found');
     err.status = 404;
     next(err);
   });

   // error handler
   app.use(function(err, req, res, next) {
     // set locals, only providing error in development
     res.locals.message = err.message;
     res.locals.error = req.app.get('env') === 'development' ? err : {};

     // render the error page
     res.status(err.status || 500);
     res.render('error', {layout: false});
   });
   return app;
}
