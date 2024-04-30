const Product = require('../../model/product.model');
const { getAllBrands } = require('../../services/brand.services');
const { getAllCategories } = require('../../services/category.services');

class HomeController {
  // ? [GET] /index
  async index(req, res) {
    // ? Get product limit 4 and sort by position desc
    const getBestProductPosition = await Product.find({})
      .sort({ position: -1 })
      .limit(4)
      .select('image slug');
    // ? Get All Product where type
    const getProductAccount = await Product.find({ type: 'Tài Khoản' })
      .sort({ purchased: -1 })
      .populate('category_id', 'name')
      .limit(20);
    const getProductKey = await Product.find({ type: 'Key' })
      .sort({ purchased: -1 })
      .populate('category_id', 'name')
      .limit(20);
    // ? Get All Product and sort by purcharded desc
    const getBestProductPurchased = await Product.find({})
      .sort({ purchased: -1 })
      .populate('category_id', 'name')
      .limit(20);
    // ? Get All Category
    const getCategories = await getAllCategories();
    // ? Get ALL Brand
    const getBrands = await getAllBrands();
    res.render('client/pages/home/home.ejs', {
      getBestProductPosition,
      getBestProductPurchased,
      getProductAccount,
      getProductKey,
      getCategories,
      getBrands,
    });
  }

  // ? [GET] /login
  login(req, res) {
    res.render('client/pages/login.ejs');
  }

  // ? [GET] /register
  register(req, res) {
    res.render('client/pages/register.ejs');
  }
}

module.exports = new HomeController();
