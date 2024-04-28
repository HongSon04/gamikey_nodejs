const {
  getAllBrands,
  storeBrand,
  updateBrand,
  deleteBrandByID,
  getBrandById,
  getAllTrashBrands,
  restoreBrandServices,
  deleteBrandForeverServices,
} = require('../../services/brand.services');

const index = async (req, res) => {
  // ? Get name of category from category_id of subCategory
  const Brands = await getAllBrands();
  res.render('admin/pages/brand/index.ejs', {
    Brands,
    pageTitle: 'Danh Sách Thương Hiệu',
    route: 'brand',
    success: req.flash('success'),
  });
};

const create = async (req, res) => {
  res.render('admin/pages/brand/create.ejs', {
    errors: req.flash('errors'),
    pageTitle: 'Danh Sách Thương Hiệu',
    route: 'brand',
  });
};

const store = async (req, res) => {
  const { name, status, image } = req.body;
  const data = {
    name,
    status,
    image,
  };
  await storeBrand(data);
  req.flash('success', 'Thêm Danh Mục Phụ Thành Công');

  res.redirect('/admin/brand');
};

const edit = async (req, res) => {
  const id = req.params.id;
  const Brand = await getBrandById(id);
  res.render('admin/pages/brand/edit.ejs', {
    route: 'brand',
    Brand,
    pageTitle: 'Danh Sách Thương Hiệu',
    success: req.flash('success'),
    errors: req.flash('errors'),
  });
};

const update = async (req, res) => {
  const { name, status, image } = req.body;
  const { id } = req.params;
  const data = {
    name,
    status,
  };
  if (image) {
    data.image = image;
  }
  await updateBrand(id, data);
  req.flash('success', 'Cập Nhật Danh Mục Thành Công');
  res.redirect('/admin/brand');
};

const deleteSubCategory = async (req, res) => {
  const { id } = req.params;
  await deleteBrandByID(id);
  req.flash('success', 'Xóa Danh Mục Thành Công');
  res.redirect('/admin/brand');
};

const changeStatus = async (req, res) => {
  const { id } = req.params;
  const Brand = await getBrandById(id);
  Brand.status = Brand.status === '1' ? '0' : '1';
  await Brand.save();
  res.json({ message: 'Thay Đổi Trạng Thái Thành Công ', status: 'success' });
};

const trashBrand = async (req, res) => {
  const Brands = await getAllTrashBrands();
  res.render('admin/pages/brand/trash.ejs', {
    Brands,
    pageTitle: 'Thùng Rác Thương Hiệu',
    route: 'brand',
    success: req.flash('success'),
  });
};

const restoreBrand = async (req, res) => {
  const { id } = req.params;
  await restoreBrandServices(id);
  req.flash('success', 'Khôi Phục Thương Hiệu Thành Công');
  res.redirect('/admin/brand/trash');
};

const deleteBrandForever = async (req, res) => {
  const { id } = req.params;
  await deleteBrandForeverServices(id);
  req.flash('success', 'Xóa Vĩnh Viễn Thương Hiệu Thành Công');
  res.redirect('/admin/brand/trash');
};

module.exports = {
  index,
  create,
  store,
  edit,
  update,
  deleteSubCategory,
  changeStatus,
  trashBrand,
  restoreBrand,
  deleteBrandForever,
};
