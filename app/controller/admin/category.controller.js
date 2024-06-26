const Category = require('../../model/category.model');
const {
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategoryByID,
  restoreCategory,
  deleteForeverCategory,
} = require('../../services/category.services');

// ? [GET] /admin/category
const index = async (req, res) => {
  const categories = await getAllCategories();
  res.render('admin/pages/category/index.ejs', {
    categories,
    pageTitle: 'Danh Sách Danh Mục',
    route: 'category',
    success: req.flash('success'),
    errors: req.flash('errors'),
  });
};

// ? [GET] /admin/category/create
const create = (req, res) => {
  res.render('admin/pages/category/create.ejs', {
    errors: req.flash('errors'),
    pageTitle: 'Danh Sách Danh Mục',
    route: 'category',
  });
};

// ? [POST] /admin/category/store
const store = async (req, res) => {
  try {
    const { name, status } = req.body;
    const category = new Category({ name, status });
    await category.save();
    req.flash('success', 'Thêm Danh Mục Thành Công');

    res.redirect('/admin/category');
  } catch (error) {
    console.log('Đã lỗi: ', error);
    req.flash('errors', { msg: 'Thêm Danh Mục Thất Bại Hoặc Đã Tồn Tại Tên' });
    res.redirect('/admin/category/create');
  }
};

// ? [GET] /admin/category/edit/:id
const edit = async (req, res) => {
  const id = req.params.id;
  const category = await getCategoryById(id);
  res.render('admin/pages/category/edit.ejs', {
    category,
    pageTitle: 'Danh Sách Danh Mục',
    route: 'category',
    success: req.flash('success'),
    errors: req.flash('errors'),
  });
};

// ? [PATCH] /admin/category/update/:id
const update = async (req, res) => {
  const { name, status } = req.body;
  const { id } = req.params;
  try {
    const data = {
      name,
      status,
    };

    await updateCategory(id, data);
    req.flash('success', 'Cập Nhật Danh Mục Thành Công');
    res.redirect('/admin/category');
  } catch (error) {
    console.log('Đã lỗi: ', error);
    req.flash('errors', { msg: 'Cập Nhật Danh Mục Thất Bại' });
    res.redirect('/admin/category/edit/' + id);
  }
};

// ? [DELETE] /admin/category/delete/:id
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  await deleteCategoryByID(id);
  req.flash('success', 'Xóa Danh Mục Thành Công');
  res.redirect('/admin/category');
};

// ? [PATCH] /admin/category/change-status/:id
const changeStatus = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  category.status = category.status === '1' ? '0' : '1';
  await category.save();
  res.json({ message: 'Thay Đổi Trạng Thái Thành Công ', status: 'success' });
};

// ? [GET] /admin/category/trash
const getTrashCategories = async (req, res) => {
  const categories = await Category.find({ deletedAt: { $ne: null } });
  res.render('admin/pages/category/trash.ejs', {
    categories,
    pageTitle: 'Danh Sách Danh Mục',
    route: 'category',
    success: req.flash('success'),
  });
};

// ? [PATCH] /admin/category/restore/:id
const restore = async (req, res) => {
  const { id } = req.params;
  await restoreCategory(id);
  req.flash('success', 'Khôi Phục Danh Mục Thành Công');
  res.redirect('/admin/category/trash');
};

// ? [DELETE] /admin/category/delete-permanently/:id
const deletePermanently = async (req, res) => {
  const { id } = req.params;
  await deleteForeverCategory(id);
  req.flash('success', 'Xóa Vĩnh Viễn Danh Mục Thành Công');
  res.redirect('/admin/category/trash');
};

module.exports = {
  index,
  create,
  store,
  edit,
  update,
  deleteCategory,
  changeStatus,
  getTrashCategories,
  restore,
  deletePermanently,
};
