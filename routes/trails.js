var express = require('express');
var router = express.Router();

var Trail = require('../models/trail');

function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

function authenticate(req, res, next) {
  if(!req.isAuthenticated()) {
    req.flash('error', 'Please signup or login.');
    res.redirect('/');
  }
  else {
    next();
  }
}


// INDEX
router.get('/', authenticate, function(req, res, next) {
  // get all the todos and render the index view
  Trail.find({ user: currentUser }).sort('-createdAt')
  .then(function(trails) {
    res.render('trails/index', { trails: trails } );
  })
  .catch(function(err) {
    return next(err);
  });
});



// NEW
router.get('/new', authenticate, function(req, res, next) {
  var todo = {
    title: '',
    completed: false
  };
  res.render('trails/new', { trails: trails } );
});

module.exports = router;
