const express = require('express');
const OrderController = require('../../app/controller/admin/OrderController');
const OrderRouter = express.Router();

// ? [GET] /admin/order
OrderRouter.get('/', OrderController.index);
// ? [GET] /admin/order/detail/:id
OrderRouter.get('/detail/:id', OrderController.detail);

module.exports = OrderRouter;