import express, { Router } from 'express';

import categoryRouter from './category.routes';

const adminRouter: Router = express.Router();

adminRouter.use('/category', categoryRouter);

export default adminRouter;