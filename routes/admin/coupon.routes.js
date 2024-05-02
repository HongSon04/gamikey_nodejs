const express = require('express');
const CouponController = require('../../app/controller/admin/CouponController');
const CouponRouter = express.Router();

// ? [GET] /admin/coupon
CouponRouter.get('/', CouponController.index);
// ? [GET] /admin/coupon/create
CouponRouter.get('/create', CouponController.create);
// ? [GET] /admin/coupon/edit
CouponRouter.get('/edit/:id', CouponController.edit);
// ? [POST] /admin/coupon/store
CouponRouter.post('/store', CouponController.store);
// ? [PATCH] /admin/coupon/update
CouponRouter.patch('/update/:id', CouponController.update);
// ? [PATCH] /admin/coupon/change-status
CouponRouter.patch('/change-status/:id', CouponController.changeStatus);

// ? [DELETE] /admin/coupon/delete/:id
CouponRouter.delete('/delete/:id', CouponController.delete);
module.exports = CouponRouter;
