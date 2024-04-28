const SubCategory = require('../model/subCategory.model');
const Category = require('../model/category.model');

const getAllCategories = async () => {
  return await Category.find({ deletedAt: null });
};

const getAllSubCategories = async () => {
  return await SubCategory.find({ deletedAt: null }).populate(
    'category_id',
    'name',
  );
};

const storeSubCategory = async (data) => {
  const subCategory = new SubCategory({
    name: data.name,
    status: data.status,
    category_id: data.category_id,
  });
  return await subCategory.save();
};

const getSubCategoryById = async (id) => {
  return await SubCategory.findById(id);
};

const updateSubCategory = async (id, data) => {
  return await SubCategory.updateOne(
    { _id: id },
    {
      name: data.name,
      status: data.status,
      category_id: data.category_id,
    },
  );
};

const deleteSubCategoryByID = async (id) => {
  return await SubCategory.updateOne(
    { _id: id },
    {
      expiredAt: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
      deletedAt: new Date(),
    },
  );
};

const restoreSubCategoryServices = async (id) => {
  return await SubCategory.updateOne(
    { _id: id },
    { deletedAt: null, expiredAt: null },
  );
};

const deleteForeverSubCategory = async (id) => {
  return await SubCategory.deleteOne({ _id: id });
};

module.exports = {
  getAllCategories,
  getAllSubCategories,
  getSubCategoryById,
  storeSubCategory,
  updateSubCategory,
  deleteSubCategoryByID,
  restoreSubCategoryServices,
  deleteForeverSubCategory,
};
