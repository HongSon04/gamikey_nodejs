const Product = require('../../model/product.model');
const { getAllBrands } = require('../../services/brand.services');
const { getAllCategories } = require('../../services/category.services');

class CartController {
  // [GET] /cart
  async mainCart(req, res) {
    // ? Get All Product and sort by purcharded desc
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
    const userInfo = req.headers.authorization;
    res.render('client/pages/cart.ejs', {
      getBestProductPurchased,
      getCategories,
      getBrands,
      userInfo,
      slug: 'cart',
      carts,
      code,
      success: req.flash('success'),
      errors: req.flash('errors'),
    });
  }

  // [GET] /checkout
  checkout(req, res) {
    res.render('client/pages/checkout.ejs');
  }

  // ? [GET] /addToCart
  addToCart(req, res) {
    const data = req.query;
    let carts = req.session.cart || [];
    let check = false;
    if (carts.length > 0) {
      carts.forEach((cart) => {
        if (cart.id == data.id) {
          cart.quantity += 1;
          cart.totalPrice = cart.quantity * cart.price;
          check = true;
        }
      });
    }

    if (check == false) {
      carts.push({
        id: data.id,
        name: data.name,
        slug: data.slug,
        image: data.image,
        price: parseInt(data.price),
        quantity: parseInt(data.quantity),
        totalPrice: parseInt(data.price) * parseInt(data.quantity),
        type: data.type,
      });
    }

    req.session.cart = carts;
    let total = 0;
    if (carts.length > 0) {
      carts.forEach((cart) => {
        total += parseInt(cart.totalPrice);
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Thêm vào giỏ hàng thành công!',
      data: carts,
      total: total,
    });
  }

  // ? [GET] /getCart
  getCart(req, res) {
    let carts = req.session.cart || [];
    let total = 0;
    if (carts.length > 0) {
      carts.forEach((cart) => {
        total += cart.totalPrice;
      });
    }
    res.status(200).json({
      status: 'success',
      data: carts,
      total: total,
    });
  }

  // ? [GET] /decreaseQty
  decreaseQty(req, res) {
    const { id } = req.query;
    let carts = req.session.cart;

    carts.forEach((cart) => {
      if (cart.id == id) {
        if (cart.quantity > 1) {
          cart.quantity -= 1;
          cart.totalPrice = cart.quantity * cart.price;
        }
      }
    });

    let total = 0;
    carts.forEach((cart) => {
      total += cart.totalPrice;
    });

    req.session.cart = carts;

    res.status(200).json({
      status: 'success',
      message: 'Giảm số lượng sản phẩm thành công!',
      data: carts,
      total: total,
    });
  }

  // ? [GET] /increaseQty
  increaseQty(req, res) {
    const { id } = req.query;
    let carts = req.session.cart;

    carts.forEach((cart) => {
      if (cart.id == id) {
        cart.quantity += 1;
        cart.totalPrice = cart.quantity * cart.price;
      }
    });

    let total = 0;
    carts.forEach((cart) => {
      total += cart.totalPrice;
    });

    req.session.cart = carts;

    res.status(200).json({
      status: 'success',
      message: 'Tăng số lượng sản phẩm thành công!',
      data: carts,
      total: total,
    });
  }

  // ? [GET] /deleteItemCart
  deleteItemCart(req, res) {
    const { id } = req.params;
    let carts = req.session.cart || [];
    if (carts.length > 0) {
      carts = carts.filter((cart) => cart.id != id);
    }

    let total = 0;
    if (carts.length > 0) {
      carts.forEach((cart) => {
        total += cart.totalPrice;
      });
    }

    req.session.cart = carts;

    res.status(200).json({
      status: 'success',
      message: 'Xóa sản phẩm khỏi giỏ hàng thành công!',
      data: carts,
      total: total,
    });
  }

  // ? [GET] /removeAllCart
  removeAllCart(req, res) {
    req.session.cart = [];
    res.status(200).json({
      status: 'success',
      message: 'Xóa toàn bộ sản phẩm khỏi giỏ hàng thành công!',
    });
  }
}

module.exports = new CartController();
