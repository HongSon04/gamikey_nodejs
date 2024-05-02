const express = require('express');
const adminRouter = express.Router();

const categoryRouter = require('./category.routes');
const dashboardRouter = require('./dashboard.route');
const subCategoryRouter = require('./subCategory.routes');
const brandRouter = require('./brand.route');
const productRouter = require('./product.routes');
const ProductAccountRouter = require('./product_account.routes');
const CouponRouter = require('./coupon.routes');

adminRouter.use('/category', categoryRouter);
adminRouter.use('/sub-category', subCategoryRouter);
adminRouter.use('/dashboard', dashboardRouter);
adminRouter.use('/brand', brandRouter);
adminRouter.use('/product', productRouter);
adminRouter.use('/product-account', ProductAccountRouter);
adminRouter.use('/coupon', CouponRouter);

module.exports = adminRouter;
