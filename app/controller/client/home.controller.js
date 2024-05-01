const { signedToken } = require('../../helper/jwt');
const randomNumber = require('../../helper/randomNumber');
const sendMailVerify = require('../../helper/send-mail');
const Product = require('../../model/product.model');
const userModel = require('../../model/user.model');
const user_tokenModel = require('../../model/user_token.model');
const { getAllBrands } = require('../../services/brand.services');
const { getAllCategories } = require('../../services/category.services');
const ejs = require('ejs');
require('dotenv').config();

class HomeController {
  // ? [GET] /index
  async index(req, res) {
    // ? Get product limit 4 and sort by position desc
    const getBestProductPosition = await Product.find({})
      .sort({ position: -1 })
      .limit(4)
      .select('image slug');
    // ? Get All Product where type
    const getProductAccount = await Product.find({ type: 'Tài Khoản' })
      .sort({ purchased: -1 })
      .populate('category_id', 'name')
      .limit(20);
    const getProductKey = await Product.find({ type: 'Key' })
      .sort({ purchased: -1 })
      .populate('category_id', 'name')
      .limit(20);
    // ? Get All Product and sort by purcharded desc
    const getBestProductPurchased = await Product.find({})
      .sort({ purchased: -1 })
      .populate('category_id', 'name')
      .limit(20);
    // ? Get All Category
    const getCategories = await getAllCategories();
    // ? Get ALL Brand
    const getBrands = await getAllBrands();
    const userInfo = req.headers.authorization;
    res.render('client/pages/home/home.ejs', {
      getBestProductPosition,
      getBestProductPurchased,
      getProductAccount,
      getProductKey,
      getCategories,
      getBrands,
      slug: 'home',
      userInfo,
    });
  }

  // ? [GET] /login
  login(req, res) {
    // ? Check User đã đăng nhập chưa
    if (req.cookies.token) {
      return res.redirect('/');
    } else {
      res.render('client/pages/login.ejs');
    }
  }

  // ? [POST] /login
  async postLogin(req, res) {
    const { email, password } = req.body;
    if (email === '' || password === '') {
      return res.redirect('/login');
    } else {
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.redirect('/login');
      } else {
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
          return res.redirect('/login');
        } else {
          // ? Lưu JWT Token
          const token = user.getSignedJwtToken();
          const options = {
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
            ),
          };
          res.cookie('token', token, options);
          if (user.role === 'admin') {
            return res.redirect('/admin/dashboard');
          } else {
            return res.redirect('/');
          }
        }
      }
    }
  }

  // ? [GET] /register
  register(req, res) {
    // ? Check User đã đăng nhập chưa
    if (req.cookies.token) {
      return res.redirect('/');
    } else {
      res.render('client/pages/register.ejs');
    }
  }

  // ? [post] /send-verify-email
  async sendVerifyEmail(req, res) {
    const email = req.body.email;
    // ? Check Isset Email
    const issetEmail = await userModel.findOne({ email });
    if (issetEmail) {
      return res.redirect('/register');
    } else {
      if (!email && email === '') {
        return res.redirect('/register');
      } else {
        const token = randomNumber(8);

        const userToken = new user_tokenModel();
        userToken.user_email = email;
        userToken.token = token;
        userToken.type = 'verify-email';
        await userToken.save();

        // ? Lưu Email vào cookies và hủy sau 5 phút
        res.cookie('email_verify', email, {
          maxAge: 5 * 60 * 1000,
          httpOnly: true,
        });

        //? Send mail
        const subject = 'Verify Email';
        const html = await ejs.renderFile(`views/email/verify-email.ejs`, {
          email,
          token,
        });
        await sendMailVerify(email, subject, html);
        return res.redirect('/check-email');
      }
    }
  }

  // ? [GET] /verify-email
  async verifyEmail(req, res) {
    const token = req.params.token;
    const email = req.cookies.email_verify;
    const userToken = await user_tokenModel.findOne({
      token,
      user_email: email,
    });

    if (userToken) {
      res.render('client/pages/register3.ejs', { email, token });
    } else {
      // ? Xóa Email trong cookies
      res.clearCookie('email_verify');
      return res.redirect('/register');
    }
  }

  // ? [GET] /check-email
  async checkEmail(req, res) {
    const email = req.cookies.email_verify;
    const token = req.params.token;
    if (email == null || email === '') {
      // ? Xóa Email trong cookies
      res.clearCookie('email_verify');
      return res.redirect('/register');
    } else {
      res.render('client/pages/register2.ejs', { email });
    }
  }

  // ? [POST] /info-register
  async infoRegister(req, res) {
    const { name, password, password_confirm, phone } = req.body;
    const token = req.params.token;
    const email = req.cookies.email_verify;
    console.log(email);
    if (
      name === '' ||
      password === '' ||
      password_confirm === '' ||
      phone === ''
    ) {
      return res.redirect('/info-register/:token');
    } else {
      if (password !== password_confirm) {
        return res.redirect('/info-register/:token');
      } else {
        const user_token = await user_tokenModel
          .findOne({
            token,
            user_email: email,
          })
          .sort({ createdAt: -1 });
        if (user_token) {
          const user = new userModel();
          user.name = name;
          user.email = user_token.user_email;
          user.password = password;
          user.phone = phone;
          user.isVerify = true;
          await user.save();
          // ? Lưu JWT Token
          // ? Lưu JWT Token
          const tokenJWT = user.getSignedJwtToken();
          const options = {
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
            ),
          };
          res.cookie('token', tokenJWT, options);
          // ? Xóa Email trong cookies
          res.clearCookie('email_verify');
          // ? Xóa Token
          await user_tokenModel.deleteOne({ token });
          return res.redirect('/login');
        } else {
          // ? Xóa Email trong cookies
          res.clearCookie('email_verify');
          return res.redirect('/register');
        }
      }
    }
  }

  // ? [GET] /send-mail
  async sendMail(req, res) {
    const email = 'user123@gmail.com';
    const subject = 'Hello';
    const token = '123456';
    const html = await ejs.renderFile(`views/email/verify-email.ejs`, {
      email,
      token,
    });
    await sendMailVerify(email, subject, html);
    res.send('Send mail success');
  }

  // ? [GET] /logout
  logout(req, res) {
    res.clearCookie('token');
    return res.redirect('/');
  }
}

module.exports = new HomeController();
