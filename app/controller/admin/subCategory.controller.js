const SubCategory = require('../../model/subCategory.model');
const {
  getAllCategories,
  getAllSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategoryByID,
  storeSubCategory,
  restoreSubCategoryServices,
  deleteForeverSubCategory,
} = require('../../services/subCategory.services');

// ? [GET] /admin/sub-category
const index = async (req, res) => {
  // ? Get name of category from category_id of subCategory
  const SubCategories = await getAllSubCategories();
  res.render('admin/pages/subCategory/index.ejs', {
    SubCategories,
    pageTitle: 'Danh Mục Phụ',
    route: 'subcategory',
    success: req.flash('success'),
  });
};

// ? [GET] /admin/sub-category/create
const create = async (req, res) => {
  const categories = await getAllCategories();
  res.render('admin/pages/subCategory/create.ejs', {
    errors: req.flash('errors'),
    categories,
    pageTitle: 'Danh Mục Phụ',
    route: 'subcategory',
  });
};

// ? [POST] /admin/sub-category/store
const store = async (req, res) => {
  try {
    const { name, category_id, status } = req.body;
    const data = {
      name,
      status,
      category_id,
    };
    await storeSubCategory(data);
    req.flash('success', 'Thêm Danh Mục Phụ Thành Công');

    res.redirect('/admin/sub-category');
  } catch (error) {
    req.flash('errors', 'Thêm Danh Mục Phụ Thất Bại');
    res.redirect('/admin/sub-category/create');
  }
};

// ? [GET] /admin/sub-category/edit/:id
const edit = async (req, res) => {
  const id = req.params.id;
  const categories = await getAllCategories();
  const subCategory = await getSubCategoryById(id);
  res.render('admin/pages/subCategory/edit.ejs', {
    subCategory,
    categories,
    pageTitle: 'Danh Mục Phụ',
    route: 'subcategory',
    success: req.flash('success'),
    errors: req.flash('errors'),
  });
};

// ? [PATCH] /admin/sub-category/update/:id
const update = async (req, res) => {
  try {
    const { name, category_id, status } = req.body;
    const { id } = req.params;
    const data = {
      name,
      status,
      category_id,
    };

    await updateSubCategory(id, data);
    req.flash('success', 'Cập Nhật Danh Mục Thành Công');
    res.redirect('/admin/sub-category');
  } catch (error) {
    req.flash('errors', 'Cập Nhật Danh Mục Thất Bại');
    res.redirect('/admin/sub-category/edit/' + req.params.id);
  }
};

// ? [DELETE] /admin/sub-category/delete/:id
const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteSubCategoryByID(id);
    req.flash('success', 'Xóa Danh Mục Thành Công');
    res.redirect('/admin/sub-category');
  } catch (error) {
    req.flash('errors', 'Xóa Danh Mục Thất Bại');
    res.redirect('/admin/sub-category');
  }
};

//  ? [PATCH] /admin/sub-category/change-status/:id
const changeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const subCategory = await getSubCategoryById(id);
    subCategory.status = subCategory.status === '1' ? '0' : '1';
    await subCategory.save();
    res.json({ message: 'Thay Đổi Trạng Thái Thành Công ', status: 'success' });
  } catch (error) {
    res.json({ message: 'Thay Đổi Trạng Thái Thất Bại ', status: 'fail' });
  }
};

// ? [GET] /admin/sub-category/getSubCategoryByIdCategory/:id
const getSubCategoryByIdCategory = async (req, res) => {
  const { id } = req.params;
  const subCategories = await SubCategory.find({ category_id: id });
  res.json(subCategories);
};

//  ? [GET] /admin/sub-category/trash
const trashSubCategory = async (req, res) => {
  const SubCategories = await SubCategory.find({
    deletedAt: { $ne: null },
  }).populate('category_id', 'name');
  res.render('admin/pages/subCategory/trash.ejs', {
    SubCategories,
    pageTitle: 'Danh Mục Phụ',
    route: 'subcategory',
    success: req.flash('success'),
  });
};

// ? [PATCH] /admin/sub-category/restore/:id
const restoreSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await restoreSubCategoryServices(id);
    req.flash('success', 'Khôi Phục Danh Mục Thành Công');
    res.redirect('/admin/sub-category');
  } catch (error) {
    req.flash('errors', 'Khôi Phục Danh Mục Thất Bại');
    res.redirect('/admin/sub-category');
  }
};

// ? [DELETE] /admin/sub-category/delete-permanently/:id
const deletePermanently = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteForeverSubCategory(id);
    req.flash('success', 'Xóa Vĩnh Viễn Danh Mục Thành Công');
    res.redirect('/admin/sub-category/trash');
  } catch (error) {
    req.flash('errors', 'Xóa Vĩnh Viễn Danh Mục Thất Bại');
    res.redirect('/admin/sub-category/trash');
  }
};

module.exports = {
  index,
  create,
  store,
  edit,
  update,
  deleteSubCategory,
  changeStatus,
  getSubCategoryByIdCategory,
  deletePermanently,
  restoreSubCategory,
  trashSubCategory,
};
