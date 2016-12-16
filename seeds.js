var mongoose = require('mongoose');
// var Todo = require('./models/todo');


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

// our script will not exit until we have disconnected from the db.
function quit() {
  mongoose.disconnect();
  console.log('\nQuitting!');
}

// a simple error handler
function handleError(err) {
  console.log('ERROR:', err);
  quit();
  return err;
}

console.log('removing old todos...');
Todo.remove({})
.then(function() {
  console.log('old todos removed');
  console.log('creating some new todos...');
  var groceries  = new Todo({ title: 'groceries',    completed: false });
  var feedTheCat = new Todo({ title: 'feed the cat', completed: true  });
  return Todo.create([groceries, feedTheCat]);
})
.then(function(savedTodos) {
  console.log('Just saved', savedTodos.length, 'todos.');
  return Todo.find({});
})
.then(function(allTodos) {
  console.log('Printing all todos:');
  allTodos.forEach(function(todo) {
    console.log(todo);
  });
  return Todo.findOne({title: 'groceries'});
})
.then(function(groceries) {
  groceries.completed = true;
  return groceries.save();
})
.then(function(groceries) {
  console.log('updated groceries:', groceries);
  return groceries.remove();
})
.then(function(deleted) {
  return Todo.find({});
})
.then(function(allTodos) {
  console.log('Printing all todos:');
  allTodos.forEach(function(todo) {
    console.log(todo);
  });
  quit();
});
