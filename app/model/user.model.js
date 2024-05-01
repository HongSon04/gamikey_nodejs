const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    avatar: { type: String, default: 'https://via.placeholder.com/150' },
    isVerify: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// ? Hash password before save
UserSchema.pre('save', function (next) {
  let salt = require('bcrypt').genSaltSync(10);
  this.password = require('bcrypt').hashSync(this.password, salt);
  next();
});

// ? Sign JWT Token
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// ? Match user entered password to hashed password in database
UserSchema.methods.matchPassword = function (enteredPassword) {
  return require('bcrypt').compareSync(enteredPassword, this.password);
};
module.exports = mongoose.model('User', UserSchema, 'users');
