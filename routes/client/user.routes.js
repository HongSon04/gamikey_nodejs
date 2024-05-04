const express = require('express');
const UserProfileController = require('../../app/controller/client/UserProfileController');
const UserRouter = express.Router();
const multer = require('multer');
const fileUpload = multer();
const { uploadCloud } = require('../../app/helper/cloudImage');

UserRouter.get('/userProfile', UserProfileController.index);
UserRouter.get('/billUserProfile', UserProfileController.billUser);
UserRouter.get('/passwordProfile', UserProfileController.passwordUser);

// ? [PATCH] /userProfile/updateImage/
UserRouter.patch(
  '/userProfile/updateImage',
  fileUpload.single('image'),
  uploadCloud,
  UserProfileController.updateImage,
);

// ? [PATCH] /userProfile/updateInfo/
UserRouter.patch(
  '/userProfile/updateUser',
  UserProfileController.updateUserinfo,
);

// ? [PATCH] /userProfile/changePassword
UserRouter.patch(
  '/userProfile/changePassword',
  UserProfileController.changePassword,
);

module.exports = UserRouter;
