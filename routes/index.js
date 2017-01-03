var express  = require('express');
var router   = express.Router();
var passport = require('passport');

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "What's the best hiking trail?" });
});

router.get('/signup', function(req, res) {
    res.render('signup');
});


router.post('/signup', function(req, res, next){
 //console.log('registering someone: ', req.body);
 var signUpStrategy = passport.authenticate('local-signup', {
   successRedirect : '/secret',
   failureRedirect : '/signup',
   failureFlash : true
 });
 return signUpStrategy(req, res, next);
});


//Login Routes
router.get('/login', function(req, res, next) {
    res.render('login.ejs');
});

// POST /login
router.post('/login', function(req, res, next) {
  var loginProperty = passport.authenticate('local-login', {
    successRedirect : '/secret',
    failureRedirect : '/login'
    // failureFlash : true
  });
  return loginProperty(req, res, next);
});

// GET /logout
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});


// Restricted page
router.get('/secret', function(req, res, next) {
//  res.render('secret');
 if (currentUser) {
   res.render('secret.ejs');
 }
 else {
   res.redirect('/');
 }
});



// GET /logout
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});


module.exports = router;
