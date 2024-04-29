const express = require('express');
const ProductVariantItemController = require('../../app/controller/admin/ProductVariantItemController');
const productVariantItemRouter = express.Router();

productVariantItemRouter.get('/:variant_id', ProductVariantItemController.index);

module.exports = productVariantItemRouter;