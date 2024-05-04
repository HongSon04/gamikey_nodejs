const Product = require('../../model/product.model');
const Order = require('../../model/order.model');
const UserServices = require('../../services/UserServices');
const { getAllBrands } = require('../../services/brand.services');
const { getAllCategories } = require('../../services/category.services');

class UserProfileController {
  async index(req, res) {
    const userInfo = req.headers.authorization;
    const user = await UserServices.getOne(userInfo.id);
    // ? Get All Product and sort by purcharded desc
    const getBestProductPurchased = await Product.find({})
      .sort({ purchased: -1 })
      .populate('category_id', 'name')
      .limit(20);
    // ? Get All Category
    const getCategories = await getAllCategories();
    // ? Get ALL Brand
    const getBrands = await getAllBrands();
    res.render('client/pages/user-profile/index', {
      pageTitle: 'Trang Cá Nhân',
      route: 'user',
      userInfo,
      user,
      getBestProductPurchased,
      getCategories,
      getBrands,
      slug: 'user',
      success: req.flash('success'),
      errors: req.flash('errors'),
    });
  }

  async billUser(req, res) {
    const userInfo = req.headers.authorization;
    const user = await UserServices.getOne(userInfo.id);
    // ? Get All Product and sort by purcharded desc
    const getBestProductPurchased = await Product.find({})
      .sort({ purchased: -1 })
      .populate('category_id', 'name')
      .limit(20);
    // ? Get All Category
    const getCategories = await getAllCategories();
    // ? Get ALL Brand
    const getBrands = await getAllBrands();
    // ? Order
    const orders = await Order.find({ customer_email: userInfo.email });
    res.render('client/pages/user-profile/bill', {
      pageTitle: 'Đơn hàng của bạn',
      route: 'bill',
      userInfo,
      user,
      orders,
      getBestProductPurchased,
      getCategories,
      getBrands,
      slug: 'bill',
      success: req.flash('success'),
      errors: req.flash('errors'),
    });
  }

  async passwordUser(req, res) {
    const userInfo = req.headers.authorization;
    const user = await UserServices.getOne(userInfo.id);
    // ? Get All Product and sort by purcharded desc
    const getBestProductPurchased = await Product.find({})
      .sort({ purchased: -1 })
      .populate('category_id', 'name')
      .limit(20);
    // ? Get All Category
    const getCategories = await getAllCategories();
    // ? Get ALL Brand
    const getBrands = await getAllBrands();
    res.render('client/pages/user-profile/password', {
      pageTitle: 'Đổi mật khẩu',
      route: 'password',
      userInfo,
      user,
      getBestProductPurchased,
      getCategories,
      getBrands,
      slug: 'password',
      success: req.flash('success'),
      errors: req.flash('errors'),
    });
  }

  async updateImage(req, res) {
    const userInfo = req.headers.authorization;
    const user = await UserServices.getOne(userInfo.id);
    user.avatar = req.body.image;
    await user.save();
    res.status(200).json({
      status: 'success',
      message: 'Cập nhật ảnh đại diện thành công',
    });
  }
  async updateUserinfo(req, res) {
    const userInfo = req.headers.authorization;
    const user = await UserServices.getOne(userInfo.id);
    const { name, phone, address } = req.body;
    user.name = name;
    user.phone = phone;
    user.address = address;
    await user.save();
    req.flash('success', 'Cập nhật thông tin thành công');
    res.redirect('/userProfile');
  }

  async changePassword(req, res) {
    const userInfo = req.headers.authorization;
    const user = await UserServices.getOne(userInfo.id);
    const { oldPassword, newPassword, reNewPassword } = req.body;
    if (oldPassword === '' || newPassword === '' || reNewPassword === '') {
      req.flash('errors', 'Vui lòng điền đầy đủ thông tin');
      return res.redirect('/passwordProfile');
    }
    const isMatchPassword = user.matchPassword(oldPassword);
    if (!isMatchPassword) {
      req.flash('errors', 'Mật khẩu cũ không đúng');
      return res.redirect('/passwordProfile');
    }
    if (newPassword !== reNewPassword) {
      req.flash('errors', 'Mật khẩu mới không khớp');
      return res.redirect('/passwordProfile');
    }
    user.password = newPassword;
    await user.save();
    req.flash('success', 'Đổi mật khẩu thành công');
    res.redirect('/passwordProfile');
  }
}

module.exports = new UserProfileController();
