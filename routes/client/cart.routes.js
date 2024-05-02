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

// ? [GET] /decreaseQty
CartRouter.get('/decreaseQty', CartController.decreaseQty);

// ? [GET] /increaseQty
CartRouter.get('/increaseQty', CartController.increaseQty);

// ? [GET] /removeAllCart
CartRouter.get('/removeAllCart', CartController.removeAllCart);

module.exports = CartRouter;
