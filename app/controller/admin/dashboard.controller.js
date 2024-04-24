class DashboardController {
  // ? [GET] /admin/dashboard
  index(req, res) {
    res.render('admin/pages/dashboard/dashboard.ejs');
  }
}

module.exports = new DashboardController();
