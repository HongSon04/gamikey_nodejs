const express = require('express');
const categoryRouter = express.Router();
const {
  index,
  create,
  store,
  edit,
  update,
} = require('../../app/controller/admin/category.controller');
categoryRouter.get('/');

categoryRouter.get('/', index);
categoryRouter.get('/create', create);
categoryRouter.get('/edit/:id', edit);
categoryRouter.post('/store', store);
categoryRouter.patch('/update/:id', update);

module.exports = categoryRouter;
