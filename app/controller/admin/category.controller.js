const Category = require('../../model/category.model');
const {
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategoryByID,
} = require('../../services/category.services');

const index = async (req, res) => {
  const categories = await getAllCategories();
  res.render('admin/pages/category/index.ejs', {
    categories,
    success: req.flash('success'),
  });
};

const create = (req, res) => {
  res.render('admin/pages/category/create.ejs', {
    errors: req.flash('errors'),
  });
};

const store = async (req, res) => {
  const { name, status } = req.body;
  const category = new Category({
    name,
    status,
  });
  await category.save();
  req.flash('success', 'Thêm Danh Mục Thành Công');

  res.redirect('/admin/category');
};

const edit = async (req, res) => {
  const id = req.params.id;
  const category = await getCategoryById(id);
  res.render('admin/pages/category/edit.ejs', {
    category,
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

  await updateCategory(id, data);
  req.flash('success', 'Cập Nhật Danh Mục Thành Công');
  res.redirect('/admin/category');
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  await deleteCategoryByID(id);
  req.flash('success', 'Xóa Danh Mục Thành Công');
  res.redirect('/admin/category');
};

const changeStatus = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  category.status = category.status === '1' ? '0' : '1';
  await category.save();
  res.json({ message: 'Thay Đổi Trạng Thái Thành Công ', status: 'success' });
};

module.exports = {
  index,
  create,
  store,
  edit,
  update,
  deleteCategory,
  changeStatus,
};
