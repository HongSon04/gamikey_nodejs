const express = require('express');
const clientRouter = express.Router();

const { decodeJwt } = require('../../app/middleware/auth');
const homeRouter = require('./home.routes');
const ProductRouter = require('./product.routes');
const CartRouter = require('./cart.routes');
const CouponRouter = require('./coupon.routes');
const CheckOutRouter = require('./checkout.routes');

clientRouter.use('/', homeRouter);
clientRouter.use('/', decodeJwt, ProductRouter);
clientRouter.use('/', decodeJwt, CartRouter);
clientRouter.use('/', decodeJwt, CouponRouter);
clientRouter.use('/', decodeJwt, CheckOutRouter);

module.exports = clientRouter;
