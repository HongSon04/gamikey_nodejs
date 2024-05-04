const express = require('express');
const UserProfileController = require('../../app/controller/client/UserProfileController');
const UserRouter = express.Router();
const multer = require('multer');
const fileUpload = multer();
const { uploadCloud } = require('../../app/helper/cloudImage');

UserRouter.get('/userProfile', UserProfileController.index);

// ? [PATCH] /userProfile/updateImage/
UserRouter.patch(
  '/userProfile/updateImage',
  fileUpload.single('image'),
  uploadCloud,
  UserProfileController.updateImage,
);

module.exports = UserRouter;
