const mongoose = require('mongoose');

const ProductReplyCommentSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comment: {
    type: String,
    required: true,
  },
  comment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductComment',
    required: true,
  },
});

const ProductReplyComment = mongoose.model(
  'ProductReplyComment',
  ProductReplyCommentSchema,
  'product_reply_comment',
);

module.exports = ProductReplyComment;
