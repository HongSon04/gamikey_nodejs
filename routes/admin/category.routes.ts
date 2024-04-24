import express, { Router } from 'express';
const categoryRouter: Router = express.Router();

categoryRouter.get('/', (req, res) => {
    res.send('Category route');
});

categoryRouter.get('/', (req, res) => {
    res.send('Category route');
});


export default categoryRouter;