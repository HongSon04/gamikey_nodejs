const express = require('express');
const categoryRouter = express.Router();
const {
  index,
  create,
  store,
  edit,
  update,
  deleteCategory,
  changeStatus,
} = require('../../app/controller/admin/category.controller');
const {
  checkNotEmptyCategory,
} = require('../../app/validation/category.validation');

categoryRouter.get('/', index);
categoryRouter.get('/create', create);
categoryRouter.get('/edit/:id', edit);
categoryRouter.post('/store', checkNotEmptyCategory, store);
categoryRouter.patch('/update/:id', checkNotEmptyCategory, update);
categoryRouter.delete('/delete/:id', deleteCategory);
categoryRouter.patch('/change-status/:id', changeStatus);

module.exports = categoryRouter;
