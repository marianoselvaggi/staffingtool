var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  fullname: {type: String, trim: true, required: true},
  email: {type: String, unique: true, lowercase: true, trim: true, required: true},
  password: {type: String, required: true},
  created: {type: Date, default: Date.now}
});

userSchema.methods.ComparePassword = function(pass) {
  return bcrypt.compareSync(pass,this.password);
};

module.exports = mongoose.model('User',userSchema);
