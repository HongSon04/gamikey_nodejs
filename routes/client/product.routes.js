const express = require('express');
const ProductController = require('../../app/controller/client/ProductController');
const ProductRouter = express.Router();

ProductRouter.get('/:slug', ProductController.index);

module.exports = ProductRouter;
