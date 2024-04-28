const express = require('express');
const subCategoryRouter = express.Router();
const {
  index,
  create,
  store,
  edit,
  update,
  deleteSubCategory,
  changeStatus,
  restoreSubCategory,
  deletePermanently,
  trashSubCategory,
} = require('../../app/controller/admin/subCategory.controller');

subCategoryRouter.get('/', index);
subCategoryRouter.get('/trash', trashSubCategory);
subCategoryRouter.get('/create', create);
subCategoryRouter.get('/edit/:id', edit);
subCategoryRouter.get('/restore/:id', restoreSubCategory);
subCategoryRouter.post('/store', store);
subCategoryRouter.patch('/update/:id', update);
subCategoryRouter.delete('/delete/:id', deleteSubCategory);
subCategoryRouter.delete('/deletePermanently/:id', deletePermanently);
subCategoryRouter.patch('/change-status/:id', changeStatus);

module.exports = subCategoryRouter;
