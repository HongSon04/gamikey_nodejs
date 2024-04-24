import express, { Router } from 'express';
const dashboardRouter: Router = express.Router();
import dashboardController from '../../controller/admin/dashboard.controller';
dashboardRouter.get('/', dashboardController.index);

export default dashboardRouter;
