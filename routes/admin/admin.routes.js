const express = require('express');
const adminRouter = express.Router();

const categoryRouter = require('./category.routes');
const dashboardRouter = require('./dashboard.route');

adminRouter.use('/category', categoryRouter);
adminRouter.use('/dashboard', dashboardRouter);

module.exports = adminRouter;
