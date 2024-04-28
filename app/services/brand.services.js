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
  if (data.image != null) {
    // ? Delete old image
    const brand = await Brand.findById(id);
    if (brand.image != null) {
      return await Brand.updateOne(
        {
          _id: id,
        },
        {
          name: data.name,
          status: data.status,
          image: data.image,
        },
      );
    }
  } else {
    return await Brand.updateOne(
      {
        _id: id,
      },
      {
        name: data.name,
        status: data.status,
      },
    );
  }
};

const deleteBrandByID = async (id) => {
  return await Brand.updateOne(
    { _id: id },
    {
      expiredAt: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
      deletedAt: new Date(),
    },
  );
};

const getAllTrashBrands = async () => {
  return await Brand.find({ deletedAt: { $ne: null } });
};

const restoreBrandServices = async (id) => {
  return await Brand.updateOne({ _id: id }, { deletedAt: null, expiredAt: null});
};

const deleteBrandForeverServices = async (id) => {
  return await Brand.deleteOne({ _id: id });
};

module.exports = {
  getAllBrands,
  getBrandById,
  storeBrand,
  updateBrand,
  deleteBrandByID,
  getAllTrashBrands,
  restoreBrandServices,
  deleteBrandForeverServices,
};
