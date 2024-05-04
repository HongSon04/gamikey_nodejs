const Product = require('../../model/product.model');
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

  async updateImage(req, res) {
    const userInfo = req.headers.authorization;
    const user = await UserServices.getOne(userInfo.id);
    user.avatar = req.body.image;
    await user.save();
    res.redirect('/userProfile');
  }
}

module.exports = new UserProfileController();
