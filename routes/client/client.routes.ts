import express, { Router } from 'express';

const clientRouter: Router = express.Router();

import homeRouter from './home.routes';

clientRouter.use('/', homeRouter);

export default clientRouter;