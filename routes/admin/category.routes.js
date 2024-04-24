const express = require('express');
const categoryRouter = express.Router();
const {
  index,
  create,
  store,
} = require('../../app/controller/admin/category.controller');
categoryRouter.get('/');

categoryRouter.get('/', index);
categoryRouter.get('/create', create);
categoryRouter.post('/store', store);

module.exports = categoryRouter;
