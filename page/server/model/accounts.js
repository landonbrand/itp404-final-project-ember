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
mongoose.model('User', userSchema);
