const Category = require('../model/category.model');

const getAllCategories = async () => {
  return await Category.find();
};

const getCategoryById = async (id) => {
  return await Category.findById(id);
};

module.exports = {
  getAllCategories,
  getCategoryById,
};
