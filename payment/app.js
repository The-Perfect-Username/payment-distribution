var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware   = require('node-sass-middleware');
var session          = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(session({secret: "h1h4h2hr@h87hcbw&#efuy893ur64hhh~2383!#", resave: false, saveUninitialized: false}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/public/css", express.static(__dirname + '/public/css'));
app.use("/public/js", express.static(__dirname + '/public/js'));
app.use("/public/images", express.static(__dirname + '/public/images'));

app.use(
   sassMiddleware({
       src: __dirname + '/sass',
       dest: __dirname + '/public/css',
       prefix: '/public/css',
       outputStyle: 'compressed',
       debug: true,
   })
);

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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
  res.render('error');
});

module.exports = app;