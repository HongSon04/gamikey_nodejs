const express = require('express');
const clientRouter = express.Router();

const homeRouter = require('./home.routes');
const ProductRouter = require('./product.routes');
const CartRouter = require('./cart.routes');
const { decodeJwt } = require('../../app/middleware/auth');

clientRouter.use('/', homeRouter);
clientRouter.use('/', decodeJwt, ProductRouter);
clientRouter.use('/', decodeJwt, CartRouter);

module.exports = clientRouter;
