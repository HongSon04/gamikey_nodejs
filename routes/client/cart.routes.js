const express = require('express');
const {
  addToCart,
  mainCart,
} = require('../../app/controller/client/CartController');
const CartRouter = express.Router();

// ? [GET] /cart
CartRouter.get('/', mainCart);
// ? [GET] /addToCart
CartRouter.get('/addToCart', addToCart);

module.exports = CartRouter;
