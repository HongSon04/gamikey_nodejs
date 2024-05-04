const Order = require('../model/order.model');

class OrderServices {
  getAll() {
    return Order.find();
  }
  getOne(id) {
    return Order.findById(id);
  }
}

module.exports = new OrderServices();
