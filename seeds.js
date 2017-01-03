var mongoose     = require('mongoose');
mongoose.Promise = require('bluebird');
var bcrypt       = require('bcrypt-nodejs');
var Todo         = require('./models/todo');
var User         = require('./models/user');

mongoose.connect('mongodb://localhost/trails');

// our script will not exit until we have disconnected from the db.
function quit() {
  mongoose.disconnect();
  console.log('\nQuitting!');
}

// a simple error handler
function handleError(err) {
  console.error('ERROR:', err);
  quit();
  return err;
}


// create some User objects
function getUsers() {
  let hiker = new User({
    local: {
      email: 'chrisrdrq@aol.com',
      password: bcrypt.hashSync('trees',  bcrypt.genSaltSync(8))
    }
  });
  let hikim = new User({
    local: {
      email: 'test@test.com',
      password: bcrypt.hashSync('dirt', bcrypt.genSaltSync(8))
    }
  });
  return [hiker, dirt];
}

console.log('removing old trails...');
Todo.remove({})
.then(function() {
  console.log('removing old users...');
  return User.remove({});
})
.then(function() {
  return User.create(getUsers());
})
.then(function(users) {
  console.log('Saved users:', users);
  console.log('creating some new trails...');

  })
.then(function(savedTrails) {
  console.log('Just saved', savedTrails.length, 'trails.');
  return trail.find({});
})

.then(function(deleted) {
  return Trail.find({});
})
.then(function(allTodos) {
  console.log('Printing all trails:');
  allTodos.forEach(function(trail) {
    console.log(trail);
  });
  quit();
})
.catch(handleError);
