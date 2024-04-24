import express, { Request, Response } from 'express';

class DashboardController {
    // ? [GET] /admin/dashboard
    index(req: Request, res: Response) {
        res.render('admin/pages/dashboard/dashboard.ejs');
    }
}

export default new DashboardController();