import express, { Request, Response } from 'express';

import Category from '../../app/model/category.mode';

class HomeController {
    // ? [GET] /index
    index(req: Request, res: Response) {
        res.render('client/pages/home/home.ejs');
    }

    // ? [GET] /login
    login(req: Request, res: Response) {
        res.render('client/pages/login.ejs');
    }

    // ? [GET] /register
    register(req: Request, res: Response) {
        res.render('client/pages/register.ejs');
    }
}

export default new HomeController();