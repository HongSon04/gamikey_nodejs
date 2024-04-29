const { getProductById } = require('../services/product.services');

const checkExistIdProduct = async (req, res, next) => {
  const product_id = req.params.product_id || req.body.product_id;
  const exitstProduct = await getProductById(product_id);
  if (exitstProduct == null) {
    req.flash('errors', { msg: 'Không tìm thấy sản phẩm' });
    return res.redirect('/admin/product');
  } else {
    req.body.exitstProduct = exitstProduct;
    next();
  }
};

module.exports = {
  checkExistIdProduct,
};
