const OrderBillServices = require('../../services/OrderBillServices');
const OrderServices = require('../../services/OrderServices');
const ProductAccountServices = require('../../services/ProductAccountServices');

class OrderController {
  async index(req, res) {
    const orders = await OrderServices.getAll();
    const username = req.headers.authorization.name;
    res.render('admin/pages/order/index', {
      orders,
      pageTitle: 'Danh Sách Đơn Hàng',
      route: 'order',
      username,
      success: req.flash('success'),
      errors: req.flash('errors'),
    });
  }

  async detail(req, res) {
    const { id } = req.params;
    const order = await OrderServices.getOne(id);
    const products = await OrderBillServices.getByID(id);
    const username = req.headers.authorization.name;
    res.render('admin/pages/order/detail', {
      order,
      pageTitle: 'Chi Tiết Đơn Hàng',
      route: 'order',
      username,
      products,
      success: req.flash('success'),
      errors: req.flash('errors'),
    });
  }
}

module.exports = new OrderController();
