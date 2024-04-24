import express, { Router } from 'express';

const homeRouter: Router = express.Router();

// ? [GET] /
homeRouter.get('/', (req, res) => {
    res.render('client/pages/home/home.ejs')
});
// ? [GET] /home
homeRouter.get('/home', (req, res) => {
    res.render('client/pages/home/home.ejs')
});

// ? [GET] /login
homeRouter.get('/login', (req, res) => {
    res.render('client/pages/login.ejs')
});

// ? [GET] /register
homeRouter.get('/register', (req, res) => {
    res.render('client/pages/register.ejs')
});

export default homeRouter;