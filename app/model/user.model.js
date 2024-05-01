const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    avatar: { type: String, default: 'https://via.placeholder.com/150' },
    isVerify: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);
