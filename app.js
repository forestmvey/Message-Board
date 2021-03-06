var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
const passport = require('passport');

// mongodb connection via mongoose
require('./api_server/db');


// view engine setup
app.set('views', path.join(__dirname,'app_server', 'views'));
app.set('view engine', 'pug');


// router
const appRouter = require('./app_server/routes/app_router');

// api router
const apiRouter = require('./api_server/routes/api_router');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

//routing after middleware!
app.use('/api/v1', apiRouter);
app.use('/', appRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
