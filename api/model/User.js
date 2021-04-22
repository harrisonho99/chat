const mongoose = ({ Schema } = require('mongoose'));

const UserSchema = new Schema({
  displayName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  friendsList: [],
  messageList: [],
});

module.exports = mongoose.model('User', UserSchema);