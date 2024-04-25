const Category = require('../../model/category.model');
const {
  getAllCategories,
  getCategoryById,
} = require('../../services/category.services');

const index = async (req, res) => {
  const categories = await getAllCategories();
  console.log(categories);
  res.render('admin/pages/category/index.ejs', { categories });
};

const create = (req, res) => {
  res.render('admin/pages/category/create.ejs', {
    success: req.flash('success'),
    errors: req.flash('errors'),
  });
};

const store = async (req, res) => {
  const { name, status } = req.body;
  let listErrors = [];
  if (name == '') {
    listErrors.push('Tên Danh Mục Không Được Để Trống');
    req.flash('errors', { msg: 'Tên Danh Mục Không Được Để Trống' });
  }
  if (status == '') {
    listErrors.push('Status is required');
    req.flash('errors', { msg: 'Trạng Thái Không Được Để Trống' });
  }
  if (listErrors.length) {
    res.redirect('/admin/category/create');
  } else {
    const category = new Category({
      name,
      status,
    });
    await category.save();
    req.flash('success', { msg: 'Thêm Danh Mục Thành Công' });

    res.redirect('/admin/category');
  }
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
  console.log(id, name, status);
  res.send(id + name + status);
}

module.exports = {
  index,
  create,
  store,
  edit,update
};
