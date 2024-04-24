const express = require('express');
const dashboardRouter = express.Router();
const dashboardController = require('../../app/controller/admin/dashboard.controller');

dashboardRouter.get('/', dashboardController.index);

module.exports = dashboardRouter;
