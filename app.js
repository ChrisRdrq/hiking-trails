var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require("passport");
var LocalStrategy = require('passport-local');
var passportLocalMongoose = ('passport-local-mongoose');


var trails = require('./models/trail');
var mongoose = require('mongoose');
var User = require('./models/user');
var session =require('express-session')
    // var trailsRouter = require('./routes/trails');
var methodOverride = require('method-override');


// Routes
var homeRouter = require('./routes/index');
var userRouter = require('./routes/users');


var app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// app.get("/", function(req, res) {
//     res.render('index');
// });

mongoose.connect('mongodb://localhost/trails');

app.use(require("express-session")({
    secret: "Dogs are funny creatures",
    resave: false,
    saveUninitialized: false
}));

app.use(methodOverride('_method'));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./config/passport/passport')(passport);

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.get('/secret', isLoggedIn, function(res, req) {
    res.render('secret');
});

// Routes
app.use('/', homeRouter);

app.use('/users', userRouter);
// app.post('/register', function(req, res) {
// var newUser = new User({
//     username: req.body.username
//   });
// });

// app.post('/register',function(req, res){
//     req.body.username
//     req.body.password
//     User.register(new User({username: req.body.username}), req.body.password, function(err, user){
//         if(err){
//           return res.render('register');
//         }
//         passport.authenticate('local')(req, res, function(){
//           res.redirect('/secret');
//         });
//     });
// });
// //Login Routes
// app.get('/login', function(req, res) {
//     res.render('login');
// });
// //middleware
// app.post('login', passport.authenticate('local', {
//     successRedirect: '/secret',
//     failureRedirect: '/login'
// }), function(req, res) {});

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}




// app.use('/', index);
// app.use('/users', users);


// app.use('/trails', trailsRouter);

// catch 404 and forward to error handler
app.use(function(err,req, res, next) {
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

app.listen(process.env.PORT , 3000 );

module.exports = app;
