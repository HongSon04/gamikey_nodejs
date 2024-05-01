const mongoose = require('mongoose');

const UserTokenSchema = new mongoose.Schema({
  user_email: { type: String, required: true },
  token: { type: String, required: true },
  type: { type: String, required: true },
  expiredAt: {
    type: Date,
    default: 5 * 60 * 1000, // ? 5 minutes
    expiress: 5 * 60 * 1000, // ? 5 minutes
  },
});

module.exports = mongoose.model('UserToken', UserTokenSchema, 'user_tokens');
