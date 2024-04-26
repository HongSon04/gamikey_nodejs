const express = require('express');
const adminRouter = express.Router();

const categoryRouter = require('./category.routes');
const dashboardRouter = require('./dashboard.route');
const subCategoryRouter = require('./subCategory.routes');
const brandRouter = require('./brand.route');

adminRouter.use('/category', categoryRouter);
adminRouter.use('/sub-category', subCategoryRouter);
adminRouter.use('/dashboard', dashboardRouter);
adminRouter.use('/brand', brandRouter);

module.exports = adminRouter;
