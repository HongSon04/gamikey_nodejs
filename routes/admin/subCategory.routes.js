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
} = require('../../app/controller/admin/subCategory.controller');

subCategoryRouter.get('/', index);
subCategoryRouter.get('/create', create);
subCategoryRouter.get('/edit/:id', edit);
subCategoryRouter.post('/store', store);
subCategoryRouter.patch('/update/:id', update);
subCategoryRouter.delete('/delete/:id', deleteSubCategory);
subCategoryRouter.patch('/change-status/:id', changeStatus);

module.exports = subCategoryRouter;
