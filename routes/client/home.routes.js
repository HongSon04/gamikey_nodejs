const express = require('express');
const homeRouter = express.Router();
const HomeController = require('../../app/controller/client/home.controller');
// ? [GET] /
homeRouter.get('/', HomeController.index);
// ? [GET] /home
homeRouter.get('/home', HomeController.index);

// ? [GET] /login
homeRouter.get('/login', HomeController.login);

// ? [GET] /register
homeRouter.get('/register', HomeController.register);

// ? [GET] /send-mail
homeRouter.get('/send-mail', HomeController.sendMail);

module.exports = homeRouter;
