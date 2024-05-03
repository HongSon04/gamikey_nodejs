const express = require('express');
const CouponController = require('../../app/controller/client/CouponController');
const CouponRouter = express.Router();

CouponRouter.post('/applyCoupon', CouponController.applyCoupon);
CouponRouter.get('/getDiscountAmount', CouponController.getDiscountAmount);
CouponRouter.get('/getFinalAmount', CouponController.getFinalAmount);

module.exports = CouponRouter;
