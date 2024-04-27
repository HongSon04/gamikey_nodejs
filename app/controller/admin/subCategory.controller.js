const SubCategory = require('../../model/subCategory.model');
const {
  getAllCategories,
  getAllSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategoryByID,
  storeSubCategory,
  changeStatusSubCategory,
} = require('../../services/subCategory.services');

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

const create = async (req, res) => {
  const categories = await getAllCategories();
  res.render('admin/pages/subCategory/create.ejs', {
    errors: req.flash('errors'),
    categories,
    pageTitle: 'Danh Mục Phụ',
    route: 'subcategory',
  });
};

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

const getSubCategoryByIdCategory = async (req, res) => {
  const { id } = req.params;
  const subCategories = await SubCategory.find({ category_id: id });
  res.json(subCategories);
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
};
