var mongoose = require("mongoose");
var passportLocalMongoose= require('passport-local-mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  local : {
    email    : { type: String, required: true },

    password : { type: String, required: true }
  }


});

// // ,todos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Todo'}]
// });
//
UserSchema.methods.encrypt = function(password) {
return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.isValidPassword = function(password) {
return bcrypt.compareSync(password, this.local.password);
};
//
// UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
