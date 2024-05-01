const jwt = require('jsonwebtoken');
const userModel = require('../model/user.model');
require('dotenv').config();
const decodeJwt = async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // ? Check if JWT is expired then delete cookie token
    if (decoded.exp < Date.now() / 1000) {
      res.clearCookie('token');
    } else {
      const user = await userModel
        .findOne({ _id: decoded.id })
        .select('-password');
      req.headers.authorization = user;
    }
  }
  next();
};

const isLogin = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.redirect('/login');
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (req.headers.authorization.role !== 'admin') {
    return res.redirect('/');
  }
  next();
};

module.exports = { decodeJwt, isLogin, isAdmin };
