const Coupon = require('../../model/coupon.model');

class CouponController {
  async applyCoupon(req, res) {
    try {
      const code = req.body.coupon;
      const coupon = await Coupon.findOne({ code });
      if (!coupon) {
        return res.status(400).json({ message: 'Không tìm thấy mã giảm giá' });
      }
      if (coupon.status === 'inactive') {
        return res.status(400).json({ message: 'Mã giảm giá đã hết hạn' });
      }
      if (coupon.quantity <= 0) {
        return res
          .status(400)
          .json({ message: 'Mã giảm giá đã hết lượt sử dụng' });
      }
      if (coupon.startDateDiscount > new Date()) {
        return res
          .status(400)
          .json({ message: 'Mã giảm giá chưa tới ngày sử dụng' });
      }
      if (coupon.endDateDiscount < new Date()) {
        return res
          .status(400)
          .json({ message: 'Mã giảm giá đã hết hạn sử dụng' });
      }
      const dataConfig = {
        code: coupon.code,
        discountType: coupon.discountType,
        discountAmount: coupon.discountAmount,
      };

      req.session.coupon = dataConfig;

      return res.status(200).json({
        message: 'Áp dụng mã giảm giá thành công',
        status: 'success',
        data: dataConfig,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Đã có lỗi xảy ra' });
    }
  }

  async getDiscountAmount(req, res) {
    try {
      const code = req.session.coupon;
      const carts = req.session.cart;
      const total = carts.reduce((acc, cart) => acc + cart.totalPrice, 0);
      if (code) {
        if (total) {
          if (code.discountType === 'percentage') {
            const discount = (total * code.discountAmount) / 100;
            return res.status(200).json({ discount, status: 'success' });
          } else {
            const discount = code.discountAmount;
            return res.status(200).json({ discount, status: 'success' });
          }
        }
      }
    } catch (error) {
      return res.status(500).json({ message: 'Đã có lỗi xảy ra' });
    }
  }

  async getFinalAmount(req, res) {
    try {
      const carts = req.session.cart;
      const total = carts.reduce((acc, cart) => acc + cart.totalPrice, 0);
      const code = req.session.coupon;
      if (total) {
        if (code) {
          if (code.discountType === 'percentage') {
            const discount = (total * code.discountAmount) / 100;
            const finalAmount = total - discount;
            return res
              .status(200)
              .json({ finalAmount, discount, total, status: 'success' });
          } else {
            const discount = code.discountAmount;
            const finalAmount = total - discount;
            return res
              .status(200)
              .json({ finalAmount, discount, total, status: 'success' });
          }
        } else {
          const finalAmount = total;
          return res
            .status(200)
            .json({ finalAmount, discount: 0, total, status: 'success' });
        }
      } 
    } catch (error) {
      return res.status(500).json({ message: 'Đã có lỗi xảy ra' });
    }
  }
}

module.exports = new CouponController();
