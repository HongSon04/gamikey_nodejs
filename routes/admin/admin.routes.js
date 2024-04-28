const express = require('express');
const adminRouter = express.Router();

const categoryRouter = require('./category.routes');
const dashboardRouter = require('./dashboard.route');
const subCategoryRouter = require('./subCategory.routes');
const brandRouter = require('./brand.route');
const productRouter = require('./product.routes');
const productVariantRouter = require('./product_variant.route');

adminRouter.use('/category', categoryRouter);
adminRouter.use('/sub-category', subCategoryRouter);
adminRouter.use('/dashboard', dashboardRouter);
adminRouter.use('/brand', brandRouter);
adminRouter.use('/product', productRouter);
adminRouter.use('/product-variant', productVariantRouter);

module.exports = adminRouter;
