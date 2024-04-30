const Product = require('../../model/product.model');
const { getAllBrands } = require('../../services/brand.services');
const { getAllCategories } = require('../../services/category.services');
const {
  getProductBySlug,
  getNearProductByCategory,
} = require('../../services/product.services');

class ProductController {
  async index(req, res) {
    const { slug } = req.params;
    const product = await getProductBySlug(slug);
    const productCategory = product.category_id;
    const nextProducts = await getNearProductByCategory(productCategory);
    // ? Get All Product and sort by purcharded desc
    const getBestProductPurchased = await Product.find({})
      .sort({ purchased: -1 })
      .populate('category_id', 'name')
      .limit(20);
    // ? Get All Category
    const getCategories = await getAllCategories();
    // ? Get ALL Brand
    const getBrands = await getAllBrands();
    res.render('client/pages/product/index.ejs', {
      product,
      nextProducts,
      getBestProductPurchased,
      getCategories,
      getBrands,
    });
  }
}

module.exports = new ProductController();
