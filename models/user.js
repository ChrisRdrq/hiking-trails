var mongooe = require("mongoose");
var passportLocalMongoose= require('passport-local-mongoose');
var UserSchema = new mongoose.Schema({
  local : {
    username : { type: String, required: true },
    password : { type: String, required: true }
  }
  // ,todos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Todo'}]
});
UserSchema.plugin(passportLocalMongoose);

UserSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);
