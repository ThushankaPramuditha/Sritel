const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },
  contact_no: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  state: { type: String, default: 'notverified' },
  type: { type: String, default: 'Customer' }, // 'Customer' or 'Staff'
  user_id: { type: String },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
