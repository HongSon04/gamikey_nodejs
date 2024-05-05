const express = require('express');
const CommentController = require('../../app/controller/admin/CommentController');
const CommentRouter = express.Router();

CommentRouter.get('/', CommentController.index);
CommentRouter.delete('/delete/:id', CommentController.delete);

module.exports = CommentRouter;