var mongoose = require('mongoose');

var TrailSchema = new mongoose.Schema({
  title: { type: String, required: true },
  difficulty: { type: String, required: true },
  completed: { type: Boolean, required: true }
});

module.exports = mongoose.model('Trail', TrailSchema);
