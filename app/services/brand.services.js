const Brand = require('../model/brand.model');

const getAllBrands = async (status = null) => {
  return await Brand.find({ deletedAt: null, status: status });
};

const storeBrand = async (data) => {
  const Brand = new Brand({
    name: data.name,
    status: data.status,
    category_id: data.category_id,
  });
  return await Brand.save();
};

const getBrandById = async (id) => {
  return await Brand.findById(id);
};

const updateBrand = async (id, data) => {
  return await Brand.updateOne(
    { _id: id },
    {
      name: data.name,
      status: data.status,
      category_id: data.category_id,
    },
  );
};

const deleteBrandByID = async (id) => {
  console.log('Đã đi vào services');
  return await Brand.updateOne({ _id: id }, { deletedAt: Date.now() });
};

module.exports = {
  getAllBrands,
  getBrandById,
  storeBrand,
  updateBrand,
  deleteBrandByID,
};
