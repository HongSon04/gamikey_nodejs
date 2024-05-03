const Product = require('../../model/product.model');
const { getAllBrands } = require('../../services/brand.services');
const { getAllCategories } = require('../../services/category.services');
const {
  getProductBySlug,
  getNearProductByCategory,
} = require('../../services/product.services');

class CheckOutController {
  async index(req, res) {
    const getBestProductPurchased = await Product.find({})
      .sort({ purchased: -1 })
      .populate('category_id', 'name')
      .limit(20);
    // ? Get All Category
    const getCategories = await getAllCategories();
    // ? Get ALL Brand
    const getBrands = await getAllBrands();
    // ? Get All Carts
    const carts = req.session.cart || [];
    const code = req.session.coupon || '';
    console.log(code.code);
    if (carts.length == 0) {
      req.flash('errors', 'Giỏ hàng của bạn đang trống');
      return res.redirect('/cart');
    }

    const userInfo = req.headers.authorization;

    res.render('client/pages/checkout/index.ejs', {
      getBestProductPurchased,
      getCategories,
      getBrands,
      slug: 'checkout',
      userInfo,
      carts,
      code,
      success: req.flash('success'),
      errors: req.flash('errors'),
    });
  }
}

module.exports = new CheckOutController();
