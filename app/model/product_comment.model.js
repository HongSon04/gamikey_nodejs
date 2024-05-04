const mongoose = require('mongoose');

const ProductCommentSchema = new mongoose.Schema(
  {
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
    rating: {
      type: Number,
      required: true,
    },
    reply_comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductReplyComment',
      },
    ],
  },
  { timestamps: true },
);

const ProductComment = mongoose.model(
  'ProductComment',
  ProductCommentSchema,
  'product_comments',
);

module.exports = ProductComment;
