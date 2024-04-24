const express = require('express');
const clientRouter = express.Router();

const homeRouter = require('./home.routes');

clientRouter.use('/', homeRouter);

module.exports = clientRouter;
