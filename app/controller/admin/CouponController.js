const CouponServices = require('../../services/CouponServices');

class CouponController {
  // ? [GET] /admin/coupon
  async index(req, res) {
    // ? Get All Coupon
    const coupons = await CouponServices.getAll();
    // ? Log user
    const username = req.headers.authorization.name;
    res.render('admin/pages/coupon/index.ejs', {
      pageTitle: 'Danh Sách Mã Giảm Giá',
      route: 'coupon',
      coupons,
      username,
      success: req.flash('success'),
      errors: req.flash('errors'),
    });
  }

  // ? [GET] /admin/coupon/create
  async create(req, res) {
    const username = req.headers.authorization.name;
    res.render('admin/pages/coupon/create.ejs', {
      errors: req.flash('errors'),
      pageTitle: 'Thêm Mã Giảm Giá',
      route: 'coupon',
    });
  }

  // ? [GET] /admin/coupon/edit
  async edit(req, res) {
    const { id } = req.params;
    const coupon = await CouponServices.getOne(id);
    if (!coupon) {
      req.flash('errors', 'Mã giảm giá không tồn tại');
      return res.redirect('/admin/coupon');
    }
    const username = req.headers.authorization.name;
    res.render('admin/pages/coupon/edit.ejs', {
      errors: req.flash('errors'),
      pageTitle: 'Chỉnh Sửa Mã Giảm Giá',
      route: 'coupon',
      coupon,
      username,
    });
  }

  // ? [POST] /admin/coupon/store
  async store(req, res) {
    const {
      name,
      code,
      status,
      quantity,
      discountType,
      discountAmount,
      startDateDiscount,
      endDateDiscount,
    } = req.body;

    const data = {
      name,
      code,
      status,
      quantity,
      discountType,
      discountAmount,
      startDateDiscount,
      endDateDiscount,
      createBy: req.headers.authorization._id,
    };

    const coupon = await CouponServices.store(data);
    if (coupon) {
      req.flash('success', 'Thêm mã giảm giá thành công');
      return res.redirect('/admin/coupon');
    } else {
      req.flash('errors', 'Thêm mã giảm giá thất bại');
      return res.redirect('/admin/coupon/create');
    }
  }

  // ? [PATCH] /admin/coupon/update
  async update(req, res) {
    const { id } = req.params;
    const {
      name,
      code,
      status,
      quantity,
      discountType,
      discountAmount,
      startDateDiscount,
      endDateDiscount,
    } = req.body;

    const data = {
      name,
      code,
      status,
      quantity,
      discountType,
      discountAmount,
      startDateDiscount,
      endDateDiscount,
      updateBy: req.headers.authorization._id,
    };

    const coupon = await CouponServices.update(id, data);
    if (coupon) {
      req.flash('success', 'Cập nhật mã giảm giá thành công');
      return res.redirect('/admin/coupon');
    } else {
      req.flash('errors', 'Cập nhật mã giảm giá thất bại');
      return res.redirect(`/admin/coupon/edit/${id}`);
    }
  }

  // ? [DELETE] /admin/coupon/delete/:id
  async delete(req, res) {
    const { id } = req.params;
    const coupon = await CouponServices.delete(id);
    if (coupon) {
      req.flash('success', 'Xóa mã giảm giá thành công');
      return res.redirect('/admin/coupon');
    } else {
      req.flash('errors', 'Xóa mã giảm giá thất bại');
      return res.redirect('/admin/coupon');
    }
  }

  // ? [PATCH] /admin/coupon/change-status
  async changeStatus(req, res) {
    const { id } = req.params;
    const coupon = await CouponServices.changeStatus(id);
    if (coupon) {
      req.flash('success', 'Thay đổi trạng thái thành công');
      return res.status(200).json({
        message: 'Thay đổi trạng thái thành công',
        status: 'success',
      });
    } else {
      req.flash('errors', 'Thay đổi trạng thái thất bại');
      return res
        .status(400)
        .json({ message: 'Thay đổi trạng thái thất bại', status: 'error' });
    }
  }
}

module.exports = new CouponController();
