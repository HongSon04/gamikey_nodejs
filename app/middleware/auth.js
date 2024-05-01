require('dotenv').config();

const isLogin = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/login');
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.redirect('/login');
  }
  next();
};

module.exports = {  isLogin, isAdmin };
