const Brand = require('../model/brand.model');

const getAllBrands = async () => {
  return await Brand.find({ deletedAt: null });
};

const storeBrand = async (data) => {
  const brand = new Brand({
    name: data.name,
    status: data.status,
    image: data.image,
  });
  return await brand.save();
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
  return await Brand.updateOne({ _id: id }, { deletedAt: Date.now() });
};

module.exports = {
  getAllBrands,
  getBrandById,
  storeBrand,
  updateBrand,
  deleteBrandByID,
};
