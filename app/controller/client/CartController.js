class CartController {
  // [GET] /cart
  mainCart(req, res) {
    res.render('client/pages/cart.ejs');
  }

  // [GET] /checkout
  checkout(req, res) {
    res.render('client/pages/checkout.ejs');
  }

  // ? [GET] /addToCart
  addToCart(req, res) {
    const data = req.query;

    if (
      req.session.cart == null ||
      req.session.cart == undefined ||
      req.session.cart.length == 0
    ) {
      // ? If cart is empty, create new cart
      req.session.cart = [];
    }
    const carts = req.session.cart;
    // ? Check if product is already in cart
    if (carts.length > 0) {
      carts.forEach((cart) => {
        if (cart.id == data.id) {
          cart.quantity += 1;
        } else {
          carts.push({
            id: data.id,
            name: data.name,
            price: data.price,
            quantity: data,
          });
        }
      });
    } else {
      carts.push({
        id: data.id,
        name: data.name,
        price: data.price,
        quantity: data.quantity,
      });
    }

    req.session.cart = carts;

    res.status(200).json({
      status: 'success',
      message: 'Thêm vào giỏ hàng thành công!',
      data: carts,
    });
  }
}

module.exports = new CartController();
