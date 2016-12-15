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
  var trails = {
    title: '',
    completed: false
  };
  res.render('trails/new', { trails: trails } );
});

// SHOW
router.get('/:id', authenticate, function(req, res, next) {
  Trail.findById(req.params.id)
  .then(function(trails) {
    if (!trails) return next(makeError(res, 'Document not found', 404));
    if (!trails.user.equals(currentUser.id)) return next(makeError(res, 'Nacho List!', 401));
    res.render('trails/show', { trails: trails });
  })
  .catch(function(err) {
    return next(err);
  });
});
// CREATE
router.post('/', authenticate, function(req, res, next) {
  var trails = new Trails({
    user:      currentUser,
    title:     req.body.title,
    completed: req.body.completed ? true : false
  });
  todo.save()
  .then(function(saved) {
    res.redirect('/trails');
  })
  .catch(function(err) {
    return next(err);
  });
});

// EDIT
router.get('/:id/edit', authenticate, function(req, res, next) {
  Trails.findById(req.params.id)
  .then(function(trails) {
    if (!trails) return next(makeError(res, 'Document not found', 404));
    if (!trails.user.equals(currentUser.id)) return next(makeError(res, 'Nacho Todo!', 401));
    res.render('trails/edit', { trails: trails });
  })
  .catch(function(err) {
    return next(err);
  });
});

// UPDATE
router.put('/:id', authenticate, function(req, res, next) {
  Trails.findById(req.params.id)
  .then(function(trails) {
    if (!todo) return next(makeError(res, 'Document not found', 404));
    if (!todo.user.equals(currentUser.id)) return next(makeError(res, 'Nacho Todo!', 401));
    trails.title = req.body.title;
    trails.completed = req.body.completed ? true : false;
    return trails.save();
  })
  .then(function(saved) {
    res.redirect('/trails');
  })
  .catch(function(err) {
    return next(err);
  });
});


module.exports = router;
