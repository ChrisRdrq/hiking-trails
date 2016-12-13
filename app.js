var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require("passport");
var LocalStrategy = require('passport-local');
var passportLocalMongoose = ('passport-local-mongoose');
var index = require('./routes/index');
var users = require('./routes/users');
var trails = require('./models/trail')
var mongoose = require('mongoose');
var User = require('./models/user')
// var trailsRouter = require('./routes/trails');
var methodOverride = require('method-override');

var app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){
  res.render("home");
});

mongoose.connect('mongodb://localhost/trails');

app.use(require("express-session")({
  secret: "Dogs are funny creatures",
  resave: false,
  saveUninitailized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocaolStratgy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.get('/secret',isLoggedIn, function(res, req){
  res.render('secret');
});


app.get('/register', function(req, res){
  res.render('register');
});

app.post('/register', function(req, res){
  req.body.username
  req.body.password
  User.register(new User({username: req.body.username}), req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render('register');
    }
//Login Routes
app.get('/login', function(req, res){
  res.render('login');
});
//middleware
app.post('login', passport.authenticate('local',{
  successRedirect: '/secret',
  failureRedirect: '/login'
}) ,function(req, res){
});
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
})


    passport.authenticate('local')(req, res, function(){
      res.redirct('/secret');
    });
  });
});
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

app.listen(process.env.PORT,process.env.IP, function(){
})

// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

app.use(methodOverride('_method'));
// app.use('/trails', trailsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
