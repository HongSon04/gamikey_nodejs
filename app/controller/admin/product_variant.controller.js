const {
  getProductVariantByIdProductService,
  storeProductVariantService,
  deleteProductVariantByIdService,
  changeStatusProductVariantService,
  getProductVariantByIdService,
  updateProductVariantService,
} = require('../../services/product_variant.services');

// [GET] /admin/product-variant/:product_id
const index = async (req, res) => {
  const product_id = req.params.product_id;
  const exitstProduct = req.body.exitstProduct;
  const productVariants = await getProductVariantByIdProductService(product_id);
  res.render('admin/pages/product/variants/index.ejs', {
    productVariants,
    product_id,
    exitstProduct,
    pageTitle: 'Danh Sách Biến Thể Sản Phẩm',
    route: 'product_variant',
    success: req.flash('success'),
  });
};

// ? [GET] /admin/product-variant/create/:product_id
const create = async (req, res) => {
  const product_id = req.params.product_id;
  const exitstProduct = req.body.exitstProduct;
  res.render('admin/pages/product/variants/create.ejs', {
    product_id,
    exitstProduct,
    pageTitle: 'Tạo Biến Thể Sản Phẩm',
    route: 'product-variant',
    errors: req.flash('errors'),
  });
};

// ? [POST] /admin/product-variant/store
const store = async (req, res) => {
  const { name, product_id, status } = req.body;
  const data = {
    name,
    product_id,
    status,
  };
  console.log(data);
  await storeProductVariantService(data);
  req.flash('success', 'Thêm biến thể sản phẩm thành công');
  res.redirect(`/admin/product-variant/${product_id}`);
};

// ? [GET] /admin/product-variant/edit/:variant_id
const edit = async (req, res) => {
  const productVariant = await getProductVariantByIdService(
    req.params.variant_id,
  );
  console.log(productVariant);
  res.render('admin/pages/product/variants/edit.ejs', {
    productVariant,
    pageTitle: 'Chỉnh Sửa Biến Thể Sản Phẩm',
    route: 'product_variant',
    errors: req.flash('errors'),
  });
};

// ? [PATCH] /admin/product-variant/update/:variant_id
const update = async (req, res) => {
  const { name, status } = req.body;
  const { variant_id } = req.params;
  const data = {
    name,
    status,
  };
  await updateProductVariantService(variant_id, data);
  req.flash('success', 'Cập nhật biến thể sản phẩm thành công');
  res.redirect('back');
};

// ? [DELETE] /admin/product-variant/delete/:id
const deleteProductVariant = async (req, res) => {
  const { id } = req.params;
  await deleteProductVariantByIdService(id);
  req.flash('success', 'Xóa biến thể sản phẩm thành công');
  res.redirect('back');
};

// ? [PATCH] /admin/product-variant/change-status
const changeStatusProductVariant = async (req, res) => {
  const { id } = req.params;
  await changeStatusProductVariantService(id);
  res.json({ message: 'Thay Đổi Trạng Thái Thành Công ', status: 'success' });
};

module.exports = {
  index,
  create,
  store,
  deleteProductVariant,
  changeStatusProductVariant,
  edit,
  update,
};
