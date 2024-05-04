const express = require('express');
const ProductCommentController = require('../../app/controller/client/ProductCommentController');
const ProductCommentRouter = express.Router();

ProductCommentRouter.post(
  '/createComment',
  ProductCommentController.createComment,
);

ProductCommentRouter.post(
  '/createReplyComment',
  ProductCommentController.createReplyComment,
);

module.exports = ProductCommentRouter;
