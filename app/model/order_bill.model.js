const mongoose = require('mongoose');

const OrderBillSchema = new mongoose.Schema({
  order_id: {
    type: String,
  },
  product_id: {
    type: String,
  },
  product_name: {
    type: String,
  },
  product_price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
});

const OrderBill = mongoose.model('OrderBill', OrderBillSchema, 'order_bills');

module.exports = OrderBill;
