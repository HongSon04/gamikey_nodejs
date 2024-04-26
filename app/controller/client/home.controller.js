class HomeController {
  // ? [GET] /index
  index(req, res) {
    res.render('client/pages/home/home.ejs');
  }

  // ? [GET] /login
  login(req, res) {
    res.render('client/pages/login.ejs');
  }

  // ? [GET] /register
  register(req, res) {
    res.render('client/pages/register.ejs');
  }

}

module.exports = new HomeController();
