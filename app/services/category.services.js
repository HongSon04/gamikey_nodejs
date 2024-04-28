const Category = require('../model/category.model');

const getAllCategories = async () => {
  return await Category.find({ deletedAt: null });
};

const getCategoryById = async (id) => {
  return await Category.findById(id);
};

const updateCategory = async (id, data) => {
  return await Category.updateOne(
    { _id: id },
    {
      name: data.name,
      status: data.status,
    },
  );
};

const deleteCategoryByID = async (id) => {
  return await Category.updateOne(
    { _id: id },
    {
      expiredAt: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
      deletedAt: new Date(),
    },
  );
};

const restoreCategory = async (id) => {
  return await Category.updateOne(
    { _id: id },
    { deletedAt: null, expiredAt: null },
  );
};

const deleteForeverCategory = async (id) => {
  return await Category.deleteOne({ _id: id });
}

module.exports = {
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategoryByID,
  restoreCategory,
  deleteForeverCategory,
};
