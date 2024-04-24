import express, { Router } from 'express';
import HomeController from '../../controller/client/home.controller';
const homeRouter: Router = express.Router();

// ? [GET] /
homeRouter.get('/', HomeController.index);
// ? [GET] /home
homeRouter.get('/home', HomeController.index);

// ? [GET] /login
homeRouter.get('/login', HomeController.login);

// ? [GET] /register
homeRouter.get('/register', HomeController.register);

export default homeRouter;
