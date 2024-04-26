const express = require('express');
const brandRouter = express.Router();
const {
  index,
  create,
  store,
  edit,
  update,
  deleteSubCategory,
  changeStatus,
} = require('../../app/controller/admin/brand.controller');

brandRouter.get('/', index);
brandRouter.get('/create', create);
brandRouter.get('/edit/:id', edit);
brandRouter.post('/store', store);
brandRouter.patch('/update/:id', update);
brandRouter.delete('/delete/:id', deleteSubCategory);
brandRouter.patch('/change-status/:id', changeStatus);

module.exports = brandRouter;
