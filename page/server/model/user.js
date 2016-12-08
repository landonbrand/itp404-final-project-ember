var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var UserSchema = new Schema({
  nickname: String,
  pages: [String]
});

module.exports = mongoose.model('User', UserSchema);
