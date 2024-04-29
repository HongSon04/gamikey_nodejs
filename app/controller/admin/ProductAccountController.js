const Product = require('../../model/product.model');
const ProductAccountServices = require('../../services/ProductAccountServices');
class ProductAccountController {
  // ? [GET] /admin/product-account/:product_id
  async index(req, res) {
    const { product_id } = req.params;
    const productType = await Product.findOne({ _id: product_id }).select(
      'type name',
    );
    const productAccounts =
      await ProductAccountServices.getProductAccountByIdProduct(product_id);
    res.render('admin/pages/product/account/index', {
      pageTitle: 'Thêm Tài Khoản Sản Phẩm',
      route: 'product',
      products: '',
      product_id,
      productType,
      productAccounts,
      success: req.flash('success'),
      errors: req.flash('errors'),
    });
  }

  // ? [GET] /admin/product-account/:product_id/create
  async create(req, res) {
    const { product_id } = req.params;
    // ? Get Type and name of Product
    const productType = await Product.findOne({ _id: product_id }).select(
      'type name',
    );

    res.render('admin/pages/product/account/create', {
      pageTitle: 'Thêm Tài Khoản Sản Phẩm',
      route: 'product',
      product_id,
      productType,
      success: req.flash('success'),
      errors: req.flash('errors'),
    });
  }

  // ? [POST] /admin/product-account/store/:product_id
  async store(req, res) {
    const { product_id } = req.params;
    const { username, password, code, type_account } = req.body;
    const data = {
      product_id,
      username,
      password,
      code,
      type_account,
    };
    await ProductAccountServices.store(data);

    req.flash('success', 'Thêm tài khoản thành công');
    res.redirect(`/admin/product-account/${product_id}`);
  }

  // ? [GET] /admin/product-account/edit/:product_account_id
  async edit(req, res) {
    const { product_account_id } = req.params;

    const productAccount = await ProductAccountServices.getProductAccountById(
      product_account_id,
    );
    // ? Get Type and name of Product
    const productType = await Product.findOne({
      _id: productAccount.product_id,
    }).select('type name');

    console.log(productType);

    res.render('admin/pages/product/account/edit', {
      pageTitle: 'Thêm Tài Khoản Sản Phẩm',
      route: 'product',
      productType,
      product_account_id,
      productAccount,
      success: req.flash('success'),
      errors: req.flash('errors'),
    });
  }

  // ? [PATCH] /admin/product-account/update/:product_account_id
  async update(req, res) {
    const { product_account_id } = req.params;
    const { username, password, code, type_account, product_id } = req.body;
    const data = {
      username,
      password,
      code,
      type_account,
    };
    await ProductAccountServices.update(product_account_id, data);

    req.flash('success', 'Cập nhật tài khoản thành công');
    res.redirect(`/admin/product-account/${product_id}`);
  }

  // ? [DELETE] /admin/product-account/delete/:product_account_id
  async deleteProductAccount(req, res) {
    const { product_account_id } = req.params;
    const productAccount = await ProductAccountServices.getProductAccountById(
      product_account_id,
    );
    const product_id = productAccount.product_id;
    //? Decrease quantity of Product
    const product = await Product.findOne({ _id: product_id });
    product.quantity -= 1;
    await product.save();
    await ProductAccountServices.delete(product_account_id);
    req.flash('success', 'Xóa tài khoản thành công');
    res.redirect(`/admin/product-account/${product_id}`);
  }
}

module.exports = new ProductAccountController();
