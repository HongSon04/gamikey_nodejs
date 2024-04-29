const Product = require('../../model/product.model');
const { getAllBrands } = require('../../services/brand.services');
const { getAllCategories } = require('../../services/category.services');
const {
  getProductById,
  updateProduct,
  deleteProductByID,
  getAllProducts,
  storeProduct,
  getAllTrashProductsServices,
  restoreProductByIDServies,
  deleteProductPermanentlyServices,
} = require('../../services/product.services');
const { getAllSubCategories } = require('../../services/subCategory.services');

// ? [GET] /admin/product
const index = async (req, res) => {
  const products = await getAllProducts();
  res.render('admin/pages/product/index.ejs', {
    products,
    pageTitle: 'Danh Sách Danh Mục',
    route: 'product',
    success: req.flash('success'),
    errors: req.flash('errors'),
  });
};

// ? [GET] /admin/product/create
const create = async (req, res) => {
  const categories = await getAllCategories();
  const brands = await getAllBrands();
  res.render('admin/pages/product/create.ejs', {
    success: req.flash('success'),
    errors: req.flash('errors'),
    pageTitle: 'Danh Sách Danh Mục',
    route: 'product',
    categories,
    brands,
  });
};

// ? [POST] /admin/product/store
const store = async (req, res) => {
  let {
    name,
    price,
    discount_price,
    image,
    position,
    type,
    brand_id,
    category_id,
    sub_category_id,
    description,
    short_description,
    start_discount,
    end_discount,
    status,
  } = req.body;

  if (position == null || position == '') {
    const toTalProduct = await Product.countDocuments();
    position = toTalProduct + 1;
  }

  const data = {
    name,
    price,
    discount_price,
    image,
    position,
    type,
    brand_id,
    category_id,
    sub_category_id,
    description,
    short_description,
    start_discount,
    end_discount,
    status,
  };
  if (data.image == null) {
    req.flash('errors', { msg: 'Hình ảnh không được để trống' });
    return res.redirect('back');
  }

  try {
    await storeProduct(data);
    req.flash('success', 'Tạo Danh Mục Thành Công');
    res.redirect('/admin/product');
  } catch (error) {
    req.flash('errors', { msg: 'Tạo Danh Mục Thất Bại' });
    res.redirect('back');
  }
};

// ? [GET] /admin/product/edit/:id
const edit = async (req, res) => {
  const id = req.params.id;
  const product = await getProductById(id);
  const brands = await getAllBrands();
  const categories = await getAllCategories();
  const subCategories = await getAllSubCategories();
  res.render('admin/pages/product/edit.ejs', {
    product,
    categories,
    brands,
    subCategories,
    pageTitle: 'Danh Sách Danh Mục',
    route: 'product',
    success: req.flash('success'),
    errors: req.flash('errors'),
  });
};

// ? [PATCH] /admin/product/update/:id
const update = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    price,
    discount_price,
    image,
    position,
    type,
    brand_id,
    category_id,
    sub_category_id,
    description,
    short_description,
    start_discount,
    end_discount,
    status,
  } = req.body;

  const data = {
    name,
    price,
    discount_price,
    image,
    position,
    type,
    brand_id,
    category_id,
    sub_category_id,
    description,
    short_description,
    start_discount,
    end_discount,
    status,
  };

  if (data.position != null) {
    data.position = parseInt(data.position);
  } else {
    const toTalProduct = await Product.countDocuments();
    data.position = toTalProduct + 1;
  }

  try {
    await updateProduct(id, data);
    req.flash('success', 'Cập Nhật Danh Mục Thành Công');
    res.redirect('/admin/product');
  } catch (error) {
    req.flash('errors', { msg: 'Cập Nhật Danh Mục Thất Bại' });
    res.redirect('back');
  }
};

// ? [DELETE] /admin/product/delete/:id
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await deleteProductByID(id);
  req.flash('success', 'Xóa Danh Mục Thành Công');
  res.redirect('/admin/product');
};

// ? [PATCH] /admin/product/change-status/:id
const changeStatus = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  product.status = product.status === '1' ? '0' : '1';
  await product.save();
  res.json({ message: 'Thay Đổi Trạng Thái Thành Công ', status: 'success' });
};

// ? [GET] /admin/product/trash
const trash = async (req, res) => {
  const products = await getAllTrashProductsServices();
  res.render('admin/pages/product/trash.ejs', {
    products,
    pageTitle: 'Danh Sách Danh Mục',
    route: 'product',
    success: req.flash('success'),
    errors: req.flash('errors'),
  });
};

// ? [PATCH] /admin/product/restore/:id
const restore = async (req, res) => {
  const { id } = req.params;
  await restoreProductByIDServies(id);
  req.flash('success', 'Khôi Phục Danh Mục Thành Công');
  res.redirect('/admin/product');
};

// ? [DELETE] /admin/product/delete-permanently/:id
const deletePermanently = async (req, res) => {
  const { id } = req.params;
  await deleteProductPermanentlyServices(id);
  req.flash('success', 'Xóa Vĩnh Viễn Danh Mục Thành Công');
  res.redirect('/admin/product/trash');
};

module.exports = {
  index,
  create,
  store,
  edit,
  update,
  deleteProduct,
  changeStatus,
  trash,
  restore,
  deletePermanently,
};
