const Coupon = require('../model/coupon.model');

class CouponServices {
  async getAll() {
    const coupons = await Coupon.find({});
    return coupons;
  }
  async getOne(id) {
    const coupon = await Coupon.findById(id);
    return coupon;
  }
  async store(data) {
    const coupon = new Coupon();
    coupon.name = data.name;
    coupon.code = data.code;
    coupon.quantity = data.quantity;
    coupon.discountType = data.discountType;
    coupon.discountAmount = data.discountAmount;
    coupon.startDateDiscount = data.startDateDiscount;
    coupon.endDateDiscount = data.endDateDiscount;
    coupon.status = data.status;
    coupon.createBy = data.createBy;
    // ? ExpiredAt hết hạn khi endDateDiscount ;
    coupon.expireAt = data.endDateDiscount;

    await coupon.save();
    return coupon;
  }

  async update(id, data) {
    const coupon = await Coupon.findById(id);
    coupon.name = data.name;
    coupon.code = data.code;
    coupon.quantity = data.quantity;
    coupon.discountType = data.discountType;
    coupon.discountAmount = data.discountAmount;
    coupon.startDateDiscount = data.startDateDiscount;
    coupon.endDateDiscount = data.endDateDiscount;
    coupon.status = data.status;
    coupon.updateBy = data.updateBy;
    coupon.expireAt = data.endDateDiscount;

    await coupon.save();
    return coupon;
  }

  async delete(id) {
    return await Coupon.deleteOne({ _id: id });
  }

  async changeStatus(id) {
    const coupon = await Coupon.findById(id);
    coupon.status = coupon.status === '1' ? '0' : '1';
    await coupon.save();
    return coupon;
  }
}

module.exports = new CouponServices();
