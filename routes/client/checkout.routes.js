const express = require('express');
const CheckOutController = require('../../app/controller/client/CheckOutController');
const CheckOutRouter = express.Router();    

CheckOutRouter.get('/checkout', CheckOutController.index);

module.exports = CheckOutRouter;