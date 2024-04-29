const mongoose = require('mongoose');

const ProductAccountSchema = mongoose.Schema({
  product_id: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    default: null,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  used_by_email: {
    type: String,
    default: null,
  },
  used_by_user_id: {
    default: null,
    type: Number,
  },
  order_id: {
    default: null,
    type: Number,
  },
});

const ProductAccount = mongoose.model(
  'ProductAccount',
  ProductAccountSchema,
  'product_accounts',
);

module.exports = ProductAccount;
