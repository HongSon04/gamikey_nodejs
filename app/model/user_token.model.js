const mongoose = require('mongoose');

const UserTokenSchema = new mongoose.Schema(
  {
    user_email: { type: String, required: true },
    token: { type: String, required: true },
    type: { type: String, required: true },
    //? Hết hạn sau 5 phút
    expireAt: { type: Date, default: Date.now, expires: 300 },
  },
  { timestamps: true },
);



module.exports = mongoose.model('UserToken', UserTokenSchema, 'user_tokens');
