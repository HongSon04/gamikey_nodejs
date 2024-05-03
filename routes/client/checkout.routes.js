const express = require('express');
const CheckOutController = require('../../app/controller/client/CheckOutController');
const CheckOutRouter = express.Router();

CheckOutRouter.get('/checkout', CheckOutController.index);
CheckOutRouter.post('/checkout', CheckOutController.checkout);
CheckOutRouter.get('/checkout/success', CheckOutController.paymentSuccess);

// ? [GET] /momo-payment
CheckOutRouter.get('/momo-payment', CheckOutController.momoPayment);
CheckOutRouter.get('/momo-success', CheckOutController.momoSuccess);

module.exports = CheckOutRouter;
