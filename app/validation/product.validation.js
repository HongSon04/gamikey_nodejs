const checkNotEmptyProduct = (req, res, next) => {
  const { name, price, category_id, description, short_description, status } =
    req.body;
  const data = {
    name,
    price,
    category_id,
    description,
    short_description,
    status,
  };
  const errors = [];
  if (data.name == null) {
    req.flash('errors', { msg: 'Tên sản phẩm không được để trống' });
    errors.push('Tên sản phẩm không được để trống');
  }
  if (data.price == null) {
    req.flash('errors', { msg: 'Giá sản phẩm không được để trống' });
    errors.push('Giá sản phẩm không được để trống');
  }
  if (data.category_id == null) {
    req.flash('errors', { msg: 'Danh mục không được để trống' });
    errors.push('Danh mục không được để trống');
  }
  if (data.description == null) {
    req.flash('errors', { msg: 'Mô tả không được để trống' });
    errors.push('Mô tả không được để trống');
  }
  if (data.short_description == null) {
    req.flash('errors', { msg: 'Mô tả ngắn không được để trống' });
    errors.push('Mô tả ngắn không được để trống');
  }
  if (data.status == null) {
    req.flash('errors', { msg: 'Trạng thái không được để trống' });
    errors.push('Trạng thái không được để trống');
  }
  if (errors.length > 0) {
    return res.redirect('back');
  }
  next();
};

module.exports = {
  checkNotEmptyProduct,
};
