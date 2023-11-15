const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: {type: mongoose.Schema.Types.ObjectId, ref: 'Organization'}
  });

const User = mongoose.model('User', userSchema);

module.exports = User;