const express = require('express');
const homeRouter = express.Router();
const HomeController = require('../../app/controller/client/home.controller');
const { decodeJwt } = require('../../app/middleware/auth');
// ? [GET] /
homeRouter.get('/', decodeJwt, HomeController.index);
// ? [GET] /home
homeRouter.get('/home', decodeJwt, HomeController.index);

// ? [GET] /login
homeRouter.get('/login', HomeController.login);

// ? [POST] /login
homeRouter.post('/login', HomeController.postLogin);

// ? [GET] /register
homeRouter.get('/register', HomeController.register);

// ? [POST] /VERIFY-EMAIL
homeRouter.post('/send-verify-email', HomeController.sendVerifyEmail);

// ? [GET] /verify-email
homeRouter.get('/verify-email/:token', HomeController.verifyEmail);

// ? [POST] /info-register
homeRouter.post('/info-register/:token', HomeController.infoRegister);

// ? [GET] /Check-Email
homeRouter.get('/check-email', HomeController.checkEmail);

// ? [GET] /logout
homeRouter.get('/logout', HomeController.logout);

module.exports = homeRouter;
