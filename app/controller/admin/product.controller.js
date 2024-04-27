const Product = require('../../model/Product.model');
const { getAllBrands } = require('../../services/brand.services');
const { getAllCategories } = require('../../services/category.services');
const {
  getProductById,
  updateProduct,
  deleteProductByID,
  getAllProducts,
} = require('../../services/product.services');
const { getAllSubCategories } = require('../../services/subCategory.services');

const index = async (req, res) => {
  const products = await getAllProducts();
  res.render('admin/pages/product/index.ejs', {
    products,
    pageTitle: 'Danh Sách Danh Mục',
    route: 'product',
    success: req.flash('success'),
  });
};

const create = async (req, res) => {
  const categories = await getAllCategories();
  const brands = await getAllBrands();
  res.render('admin/pages/product/create.ejs', {
    errors: req.flash('errors'),
    pageTitle: 'Danh Sách Danh Mục',
    route: 'product',
    categories,
    brands,
  });
};

const store = async (req, res) => {
  const {
    name,
    price,
    discount_price,
    image,
    slug,
    quantity,
    purcharsed,
    type,
    slug_type,
    brand_id,
    category_id,
    sub_category_id,
    description,
    short_description,
    start_discount,
    end_discount,
    status,
  } = req.body;

  res.redirect('/admin/product');
};

const edit = async (req, res) => {
  const id = req.params.id;
  const product = await getProductById(id);
  res.render('admin/pages/product/edit.ejs', {
    product,
    pageTitle: 'Danh Sách Danh Mục',
    route: 'product',
    success: req.flash('success'),
    errors: req.flash('errors'),
  });
};

const update = async (req, res) => {
  const { name, status } = req.body;
  const { id } = req.params;
  const data = {
    name,
    status,
  };

  await updateProduct(id, data);
  req.flash('success', 'Cập Nhật Danh Mục Thành Công');
  res.redirect('/admin/product');
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await deleteProductByID(id);
  req.flash('success', 'Xóa Danh Mục Thành Công');
  res.redirect('/admin/product');
};

const changeStatus = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  product.status = product.status === '1' ? '0' : '1';
  await product.save();
  res.json({ message: 'Thay Đổi Trạng Thái Thành Công ', status: 'success' });
};

module.exports = {
  index,
  create,
  store,
  edit,
  update,
  deleteProduct,
  changeStatus,
};
