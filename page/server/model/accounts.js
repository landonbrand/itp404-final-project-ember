var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  login: String,
  // sites: [
  //   name: String,
  //   data: {
  //     html: String,
  //     css: String
  //   }
  // ]
});
var UserModel = mongoose.model('User', userSchema);
