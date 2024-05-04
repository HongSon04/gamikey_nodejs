const express = require('express');
const UserController = require('../../app/controller/admin/UserController');
const UserRouter = express.Router();
const multer = require('multer');
const fileUpload = multer();

const { uploadCloud } = require('../../app/helper/cloudImage');

UserRouter.get('/', UserController.index);
UserRouter.get('/create', UserController.create);
UserRouter.get('/edit/:id', UserController.edit);
UserRouter.post(
  '/store',
  fileUpload.single('image'),
  uploadCloud,
  UserController.store,
);
UserRouter.patch(
  '/update/:id',
  fileUpload.single('image'),
  uploadCloud,
  UserController.update,
);

UserRouter.patch('/update-password/:id', UserController.updatePassword);
UserRouter.delete('/delete/:id', UserController.delete);

module.exports = UserRouter;
