const Category = require('../model/category.model');

const getAllCategories = async () => {
  return await Category.find({ deletedAt: null});
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
  return await Category.updateOne({ _id: id }, { deletedAt: Date.now() });
};

module.exports = {
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategoryByID,
};
