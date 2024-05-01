const Brand = require('../../model/brand.model');
const Category = require('../../model/category.model');
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
    res.render('client/pages/product_detail/index.ejs', {
      product,
      nextProducts,
      getBestProductPurchased,
      getCategories,
      getBrands,
      slug,
    });
  }

  async brand(req, res) {
    const slug = req.params.slug;
    const brand = await Brand.findOne({ slug }).select('_id');
    let products;
    if (req.query.startRangePrice != null && req.query.endRangePrice != null) {
      products = await Product.find({ brand_id: brand._id })
        .populate('category_id', 'name')
        .where('price')
        .gte(req.query.startRangePrice)
        .lte(req.query.endRangePrice);
    } else {
      products = await Product.find({ brand_id: brand._id }).populate(
        'category_id',
        'name',
      );
    }
    // ? Get All Product and sort by purcharded desc
    const getBestProductPurchased = await Product.find({})
      .sort({ purchased: -1 })
      .populate('category_id', 'name')
      .limit(20);
    // ? Get All Category
    const getCategories = await getAllCategories();
    // ? Get ALL Brand
    const getBrands = await getAllBrands();
    // ? Get All New Product

    const getNewProduct = await Product.find({})
      .sort({ createdAt: -1 })
      .limit(5);
    res.render('client/pages/product/index.ejs', {
      products,
      getBestProductPurchased,
      getCategories,
      getBrands,
      getNewProduct,
      slug,
    });
  }

  async category(req, res) {
    const slug = req.params.slug;
    const category = await Category.findOne({ slug }).select('_id');
    let products;
    if (req.query.startRangePrice != null && req.query.endRangePrice != null) {
      products = await Product.find({ category_id: category._id })
        .populate('category_id', 'name')
        .where('price')
        .gte(req.query.startRangePrice)
        .lte(req.query.endRangePrice);
    } else {
      products = await Product.find({
        category_id: category._id,
      }).populate('category_id', 'name');
    }
    // ? Get All Product and sort by purcharded desc
    const getBestProductPurchased = await Product.find({})
      .sort({ purchased: -1 })
      .populate('category_id', 'name')
      .limit(20);
    // ? Get All Category
    const getCategories = await getAllCategories();
    // ? Get ALL Brand
    const getBrands = await getAllBrands();
    // ? Get All New Product
    const getNewProduct = await Product.find({})
      .sort({ createdAt: -1 })
      .limit(5);
    res.render('client/pages/product/index.ejs', {
      products,
      getBestProductPurchased,
      getCategories,
      getBrands,
      getNewProduct,
      slug,
    });
  }

  async searchProduct(req, res) {
    const search = req.query.search;
    const products = await Product.find({
      name: { $regex: search, $options: 'i' },
    });
    // ? Get All Product and sort by purcharded desc
    const getBestProductPurchased = await Product.find({})
      .sort({ purchased: -1 })
      .populate('category_id', 'name')
      .limit(20);
    // ? Get All Category
    const getCategories = await getAllCategories();
    // ? Get ALL Brand
    const getBrands = await getAllBrands();
    // ? Get All New Product

    const getNewProduct = await Product.find({})
      .sort({ createdAt: -1 })
      .limit(5);
    res.render('client/pages/product/index.ejs', {
      products,
      getBestProductPurchased,
      getCategories,
      getBrands,
      getNewProduct,
      slug: 'search',
    });
  }

  async search(req, res) {
    const { keyword } = req.body;
    const { slugKeyword } = req.body;
    // Find product by name or by slug
    const products = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { slug: { $regex: slugKeyword, $options: 'i' } },
      ],
    });
    res.status(200).json({ products, status: 'success' });
  }
}

module.exports = new ProductController();
