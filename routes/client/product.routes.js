const express = require('express');
const ProductController = require('../../app/controller/client/ProductController');
const Product = require('../../app/model/product.model');
const ProductRouter = express.Router();

ProductRouter.get('/product/:slug', ProductController.index);
ProductRouter.get('/brand/:slug', ProductController.brand);
ProductRouter.get('/category/:slug', ProductController.category);
ProductRouter.post('/search', ProductController.search);
ProductRouter.get('/productSearch', ProductController.searchProduct);

module.exports = ProductRouter;
