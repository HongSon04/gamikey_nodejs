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
      success: req.flash('success'),
    });
  }

  // ? [GET] /login
  login(req, res) {
    // ? Check User đã đăng nhập chưa
    if (req.cookies.token) {
      return res.redirect('/');
    } else {
      res.render('client/pages/login.ejs', {
        success: req.flash('success'),
        errors: req.flash('errors'),
      });
    }
  }

  // ? [POST] /login
  async postLogin(req, res) {
    const { email, password } = req.body;
    if (email === '' || password === '') {
      req.flash('errors', 'Vui lòng nhập đầy đủ thông tin');
      return res.redirect('/login');
    } else {
      const user = await userModel.findOne({ email });
      if (!user) {
        req.flash('errors', 'Địa chỉ email không tồn tại');
        return res.redirect('/login');
      } else {
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
          //  ? Password không trùng khớp
          req.flash('errors', 'Email hoặc mật khẩu không đúng');
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
            req.flash('success', 'Đăng nhập thành công');
            return res.redirect('/admin/dashboard');
          } else {
            req.flash('success', 'Đăng nhập thành công');
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
    const subject = 'Xác nhận Email';
    const token = '123456';
    const html = await ejs.renderFile(`views/email/verify-email.ejs`, {
      email,
      token,
    });
    await sendMailVerify(email, subject, html);
    res.send('Send mail success');
  }

  // ? [GET] /forgot-password
  forgotPassword(req, res) {
    res.render('client/pages/forgot-password.ejs', {
      success: req.flash('success'),
      errors: req.flash('errors'),
    });
  }

  // ? [POST] /forgot-password
  async postForgotPassword(req, res) {
    const email = req.body.email;
    // ? Check Isset Email
    const user = await userModel.findOne({ email });
    if (!user) {
      req.flash('errors', 'Email không tồn tại');
      return res
        .status(400)
        .json({ status: 'error', message: 'Email không tồn tại' });
    } else {
      const token = randomNumber(15);
      const subject = 'Yêu cầu khôi phục mật khẩu';
      // ? Tạo Token và Email trong DB
      const userToken = new user_tokenModel();
      userToken.user_email = email;
      userToken.token = token;
      userToken.type = 'forgot-password';
      await userToken.save();
      const html = await ejs.renderFile(`views/email/forgot-password.ejs`, {
        email,
        token,
      });
      await sendMailVerify(email, subject, html);
      res.status(200).json({
        status: 'success',
        message: 'Yêu Cầu Khôi Phục Mật Khẩu Thành Công',
      });
    }
  }

  // ? [get] /resetPassword/:token
  async resetPassword(req, res) {
    const token = req.params.token;
    const userToken = await user_tokenModel.findOne({ token });
    const issetToken = true;
    if (userToken) {
      res.render('client/pages/reset-password.ejs', {
        token,
        issetToken,
        success: req.flash('success'),
        errors: req.flash('errors'),
      });
    } else {
      res.render('client/pages/reset-password.ejs', {
        success: req.flash('success'),
        errors: req.flash('errors'),
        token,
        issetToken: false,
      });
    }
  }

  // ? [POST] /reset-password/:token
  async postResetPassword(req, res) {
    const { password, password_confirm } = req.body;
    const token = req.params.token;
    if (password === '' || password_confirm === '') {
      req.flash('errors', 'Vui lòng nhập mật khẩu');
      return res.redirect(`/reset-password/${token}`);
    } else {
      if (password !== password_confirm) {
        req.flash('errors', 'Mật khẩu không trùng khớp');
        return res.redirect(`/reset-password/${token}`);
      } else {
        const userToken = await user_tokenModel.findOne({ token });
        if (userToken) {
          const user = await userModel.findOne({ email: userToken.user_email });
          user.password = password;
          await user.save();
          await userToken.deleteOne({ token });
          req.flash('success', 'Đổi mật khẩu thành công');
          return res.redirect('/login');
        } else {
          req.flash('errors', 'Yêu cầu khôi phục mật khẩu không hợp lệ');
          return res.redirect(`/reset-password/${token}`);
        }
      }
    }
  }

  // ? [GET] /logout
  logout(req, res) {
    res.clearCookie('token');
    return res.redirect('/');
  }
}

module.exports = new HomeController();
