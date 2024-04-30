const express = require('express');
const clientRouter = express.Router();

const homeRouter = require('./home.routes');
const ProductRouter = require('./product.routes');

clientRouter.use('/', homeRouter);
clientRouter.use('/product', ProductRouter);

module.exports = clientRouter;
