import express, { Router } from 'express';

import categoryRouter from './category.routes';
import dashboardRouter from './dashboard.route';

const adminRouter: Router = express.Router();

adminRouter.use('/category', categoryRouter);
adminRouter.use('/dashboard', dashboardRouter);

export default adminRouter;