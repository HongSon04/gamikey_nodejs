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
  deleteBrandForever,
  trashBrand,
  restoreBrand,
} = require('../../app/controller/admin/brand.controller');
const { uploadCloud } = require('../../app/helper/cloudImage');

brandRouter.get('/', index);
brandRouter.get('/trash', trashBrand);
brandRouter.get('/create', create);
brandRouter.get('/edit/:id', edit);
brandRouter.get('/restore/:id', restoreBrand);
brandRouter.post('/store', fileUpload.single('image'), uploadCloud, store);
brandRouter.patch(
  '/update/:id',
  fileUpload.single('image'),
  uploadCloud,
  update,
);
brandRouter.delete('/delete/:id', deleteSubCategory);
brandRouter.delete('/deletePermanently/:id', deleteBrandForever);
brandRouter.patch('/change-status/:id', changeStatus);

module.exports = brandRouter;
