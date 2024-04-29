const express = require('express');
const ProductAccountController = require('../../app/controller/admin/ProductAccountController');
const {
  checkExistIdProduct,
} = require('../../app/validation/product_account.validation');
const ProductAccountRouter = express.Router();

// ? [GET] /admin/product-account/:product_id
ProductAccountRouter.get(
  '/:product_id',
  checkExistIdProduct,
  ProductAccountController.index,
);

// ? [GET] /admin/product-account/create/:product_id
ProductAccountRouter.get(
  '/create/:product_id',
  checkExistIdProduct,
  ProductAccountController.create,
);

// ? [POST] /admin/product-account/store/:product_id
ProductAccountRouter.post(
  '/store/:product_id',
  checkExistIdProduct,
  ProductAccountController.store,
);

// ? [GET] /admin/product-account/edit/:product_account_id
ProductAccountRouter.get(
  '/edit/:product_account_id',
  ProductAccountController.edit,
);

// ? [PATCH] /admin/product-account/update/:product_account_id
ProductAccountRouter.patch(
  '/update/:product_account_id',
  ProductAccountController.update,
);

// ? [DELETE] /admin/product-account/delete/:product_account_id
ProductAccountRouter.delete(
  '/delete/:product_account_id',
  ProductAccountController.deleteProductAccount,
);

module.exports = ProductAccountRouter;
