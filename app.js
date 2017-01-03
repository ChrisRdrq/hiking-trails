var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require("passport");
var LocalStrategy = require('passport-local');
var flash = require('connect-flash');
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
var trailRouter = require('./routes/trails')

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

// Connect to database
if (process.env.MONGODB_URI) {
 mongoose.connect(process.env.MONGODB_URI);
}
else {
 mongoose.connect('mongodb://localhost/trails');
}
mongoose.connection.on('error', function(err) {
 console.error('MongoDB connection error: ' + err);
 process.exit(-1);
 }
);
mongoose.connection.once('open', function() {
 console.log("Mongoose has connected to MongoDB!");
});

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
app.use(flash());

require('./config/passport/passport')(passport);

// This middleware will allow us to use the currentUser in our views and routes.
app.use(function (req, res, next) {
 global.currentUser = req.user;
 next();
});

// Routes
app.use('/', homeRouter);
app.use('/users', userRouter);
app.use('/trails', trailRouter);



// This middleware will allow us to use the currentUser in our views and routes.
app.use(function (req, res, next) {
  global.currentUser = req.user;
  next();
});


// catch 404 and forward to error handler
app.use(function(err,req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
 app.use(function(err, req, res, next) {
   res.status(err.status || 500);
   res.render('error', {
     message: err.message + ' ',
     error: err
   });
 });
}




module.exports = app;
