const express = require('express');
const productRouter = express.Router();
const multer = require('multer');

const fileUpload = multer();
const {
  index,
  create,
  store,
  edit,
  update,
  deleteProduct,
  changeStatus,
} = require('../../app/controller/admin/product.controller');
const {
  getSubCategoryByIdCategory,
} = require('../../app/controller/admin/subCategory.controller');
const { uploadCloud } = require('../../app/helper/cloudImage');
const {
  checkNotEmptyProduct,
} = require('../../app/validation/product.validation');

productRouter.get('/', index);
productRouter.get('/create', create);
productRouter.get('/edit/:id', edit);
productRouter.post(
  '/store',
  fileUpload.single('image'),
  uploadCloud,
  checkNotEmptyProduct,
  store,
);
productRouter.patch(
  '/update/:id',
  fileUpload.single('image'),
  uploadCloud,
  checkNotEmptyProduct,
  update,
);
productRouter.delete('/delete/:id', deleteProduct);
productRouter.patch('/change-status/:id', changeStatus);
productRouter.get('/getSubCategoyByIdCategory/:id', getSubCategoryByIdCategory);

module.exports = productRouter;
