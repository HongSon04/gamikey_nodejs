const express = require('express');
const brandRouter = express.Router();

const multer = require('multer');

const fileUpload = multer();
const {
  index,
  create,
  store,
  edit,
  update,
  deleteSubCategory,
  changeStatus,
} = require('../../app/controller/admin/brand.controller');
const { uploadCloud } = require('../../app/helper/cloudImage');

brandRouter.get('/', index);
brandRouter.get('/create', create);
brandRouter.get('/edit/:id', edit);
brandRouter.post('/store', fileUpload.single('image'), uploadCloud, store);
brandRouter.patch(
  '/update/:id',
  fileUpload.single('image'),
  uploadCloud,
  update,
);
brandRouter.delete('/delete/:id', deleteSubCategory);
brandRouter.patch('/change-status/:id', changeStatus);

module.exports = brandRouter;
