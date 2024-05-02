const mongoose = require('mongoose');

const CouponSchema = mongoose.Schema(
  {
    name: String,
    code: String,
    quantity: Number,
    discountType: String,
    discountAmount: Number,
    startDateDiscount: Date,
    endDateDiscount: Date,
    status: String,
    createBy: String,
    updateBy: String,
    expireAt: Date,
  },
  {
    timestamps: true,
  },
);

const Coupon = mongoose.model('Coupon', CouponSchema, 'coupons');

module.exports = Coupon;
