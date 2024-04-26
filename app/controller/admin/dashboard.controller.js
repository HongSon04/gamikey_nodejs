class DashboardController {
  // ? [GET] /admin/dashboard
  index(req, res) {
    res.render('admin/pages/dashboard/dashboard.ejs', {
      pageTitle: 'Bảng Điều Khiển',
      route: 'dashboard',
    });
  }
}

module.exports = new DashboardController();
