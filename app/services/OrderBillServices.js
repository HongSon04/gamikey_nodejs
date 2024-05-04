const OrderBill = require('../model/order_bill.model');

class OrderBillServices {
  async getByID(id) {
    return await OrderBill.find({ order_id: id });
  }
}

module.exports = new OrderBillServices();
