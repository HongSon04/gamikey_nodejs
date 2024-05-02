const express = require('express');
const CartController = require('../../app/controller/client/CartController');
const CartRouter = express.Router();

// ? [GET] /cart
CartRouter.get('/cart', CartController.mainCart);
// ? [GET] /addToCart
CartRouter.get('/addToCart', CartController.addToCart);
// ? [GET] /getCart
CartRouter.get('/getMiniCart', CartController.getCart);

// ? [GET] /removeMiniCart
CartRouter.get('/removeMiniCart/:id', CartController.deleteItemCart);

module.exports = CartRouter;
