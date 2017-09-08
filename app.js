// imports
const
express = require('express'),
path = require('path'),
favicon = require('serve-favicon'),
logger = require('morgan'),
cookieParser = require('cookie-parser'),
bodyParser = require('body-parser'),
handlebars = require('express-handlebars').create(
  {defaultLayout: 'main'});

// routes
const index = require('./routes/index');
const got = require('./routes/got');
const squares = require('./routes/squares');

// app
const app = express();
app.locals.site = {
  title: "NodeBoard",
  github_username: "DarkPurple141",
  github_username_other: "ZAIN",
  email: "alex.hinds141@gmail.com",
  email_other: "ZAIN",
  twitter_username: "al_hinds"
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', index);
app.use('/got/', got);
app.use('/squares/', squares);

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

module.exports = app;
