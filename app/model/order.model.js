const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    invoice_id: {
      type: String,
    },
    customer_name: {
      type: String,
    },
    customer_email: {
      type: String,
    },
    customer_phone: {
      type: String,
    },
    user_id: {
      type: String,
    },
    sub_total: {
      type: Number,
    },
    discount_amount: {
      type: Number,
    },
    total_amount: {
      type: Number,
    },
    product_quantity: {
      type: Number,
    },
    payment_method: {
      type: String,
    },
    coupon: {
      type: Object,
    },
    order_status: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model('Order', OrderSchema, 'orders');

module.exports = Order;
