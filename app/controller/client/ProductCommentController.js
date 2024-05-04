const Product = require('../../model/product.model');
const ProductComment = require('../../model/product_comment.model');
const ProductReplyComment = require('../../model/product_reply_comment.model');

class ProductCommentController {
  async createComment(req, res) {
    try {
      const { product_id, comment, rating } = req.body;
      const userInfo = req.headers.authorization;
      const ProductCommentStore = new ProductComment();
      ProductCommentStore.product_id = product_id;
      ProductCommentStore.user_id = userInfo.id;
      ProductCommentStore.comment = comment;
      ProductCommentStore.rating = parseInt(rating);
      await ProductCommentStore.save();
      res
        .status(201)
        .json({ message: 'Bình luận thành công', status: 'success' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Đã Xảy Ra Lỗi' });
    }
  }

  async createReplyComment(req, res) {
    try {
      const { product_id, comment, comment_id } = req.body;
      const userInfo = req.headers.authorization;
      const ProductReplyCommentStore = new ProductReplyComment();
      ProductReplyCommentStore.product_id = product_id;
      ProductReplyCommentStore.user_id = userInfo.id;
      ProductReplyCommentStore.comment = comment;
      ProductReplyCommentStore.comment_id = comment_id;
      await ProductReplyCommentStore.save();
      const productComment = await ProductComment.findOne({ _id: comment_id });
      productComment.reply_comments.push(ProductReplyCommentStore.id);
      await productComment.save();
      res
        .status(201)
        .json({ message: 'Bình luận thành công', status: 'success' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Đã Xảy Ra Lỗi' });
    }
  }
}

module.exports = new ProductCommentController();
