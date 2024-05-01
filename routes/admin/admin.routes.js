const express = require('express');
const adminRouter = express.Router();

const categoryRouter = require('./category.routes');
const dashboardRouter = require('./dashboard.route');
const subCategoryRouter = require('./subCategory.routes');
const brandRouter = require('./brand.route');
const productRouter = require('./product.routes');
const ProductAccountRouter = require('./product_account.routes');
const { decodeJwt, isAdmin, isLogin } = require('../../app/middleware/auth');

adminRouter.use('/category', decodeJwt, isLogin, isAdmin, categoryRouter);
adminRouter.use(
  '/sub-category',
  decodeJwt,
  isLogin,
  isAdmin,
  subCategoryRouter,
);
adminRouter.use('/dashboard', decodeJwt, isLogin, isAdmin, dashboardRouter);
adminRouter.use('/brand', decodeJwt, isLogin, isAdmin, brandRouter);
adminRouter.use('/product', decodeJwt, isLogin, isAdmin, productRouter);
adminRouter.use(
  '/product-account',
  decodeJwt,
  isLogin,
  isAdmin,
  ProductAccountRouter,
);

module.exports = adminRouter;
