const express = require('express');
const {
  index,
  create,
  store,
  edit,
  update,
  deleteProductVariant,
  changeStatusProductVariant,
} = require('../../app/controller/admin/product_variant.controller');
const {
  checkExistIdProduct,
} = require('../../app/validation/product_variant.validation');
const productVariantRouter = express.Router();

productVariantRouter.get('/:product_id', checkExistIdProduct, index);
productVariantRouter.get('/create/:product_id', checkExistIdProduct, create);
productVariantRouter.get('/edit/:variant_id', edit);
productVariantRouter.post('/store', checkExistIdProduct, update);
productVariantRouter.patch('/change-status', changeStatusProductVariant);
productVariantRouter.patch('/store/:variant_id', update);
productVariantRouter.delete('/delete/:id', deleteProductVariant);

module.exports = productVariantRouter;
