const ProductComment = require('../../model/product_comment.model');
class CommentController {
  async index(req, res) {
    const comments = await ProductComment.find()
      .populate('product_id', 'name')
      .populate('user_id', 'name avatar createdAt')
      .populate({
        path: 'reply_comments',
        select: 'comment user_id createdAt product_id name avatar createdAt',
        populate: { path: 'product_id user_id', select: 'name avatar' },
      });

    return res.render('admin/pages/comment/index', {
      pageTitle: 'Danh Sách Bình Luận',
      route: 'comment',
      comments,
      success: req.flash('success'),
      errors: req.flash('errors'),
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    const comment = await ProductComment.findOneAndDelete({ _id: id });
    if (!comment) {
      req.flash('errors', 'Xóa bình luận không thành công');
      return res.redirect('/admin/comment');
    }
    req.flash('success', 'Xóa bình luận thành công');
    return res.redirect('/admin/comment');
  }
}

module.exports = new CommentController();
