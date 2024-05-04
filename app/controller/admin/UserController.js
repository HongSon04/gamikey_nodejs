const e = require('express');
const UserServices = require('../../services/UserServices');

class UserController {
  async index(req, res) {
    const username = req.headers.authorization.name;
    const users = await UserServices.getAll();
    res.render('admin/pages/user/index', {
      users,
      pageTitle: 'Danh Sách Khách Hàng',
      route: 'user',
      username,
      success: req.flash('success'),
      errors: req.flash('errors'),
    });
  }

  async create(req, res) {
    const username = req.headers.authorization.name;
    res.render('admin/pages/user/create', {
      pageTitle: 'Thêm Người Dùng',
      route: 'user',
      username,
      success: req.flash('success'),
      errors: req.flash('errors'),
    });
  }

  async store(req, res) {
    const { name, email, phone, role, image, password } = req.body;
    const data = {
      name,
      email,
      phone,
      role,
      image,
      password,
    };
    const user = await UserServices.store(data);
    if (user) {
      req.flash('success', 'Thêm người dùng thành công');
      return res.redirect('/admin/user');
    }
    req.flash('errors', 'Thêm người dùng thất bại');
    return res.redirect('/admin/user');
  }

  async edit(req, res) {
    const { id } = req.params;
    const user = await UserServices.getOne(id);
    const username = req.headers.authorization.name;
    res.render('admin/pages/user/edit', {
      user,
      pageTitle: 'Chỉnh Sửa Người Dùng',
      route: 'user',
      username,
      success: req.flash('success'),
      errors: req.flash('errors'),
    });
  }
  async update(req, res) {
    const { id } = req.params;
    const { name, email, phone, role, image } = req.body;
    const data = {
      name,
      email,
      phone,
      role,
      image,
    };
    const user = await UserServices.update(id, data);
    if (user) {
      req.flash('success', 'Thêm người dùng thành công');
      return res.redirect('/admin/user');
    }
    req.flash('errors', 'Thêm người dùng thất bại');
    return res.redirect('/admin/user');
  }

  async updatePassword(req, res) {
    const { id } = req.params;
    const { password, password_confirmation } = req.body;
    if (password == password_confirmation) {
      console.log('Mật khau khop');
      const data = {
        password,
      };
      const user = await UserServices.updatePassword(id, data);
      if (user) {
        req.flash('success', 'Cập nhật mật khẩu thành công');
        return res.redirect('/admin/user');
      }
      req.flash('errors', 'Cập nhật mật khẩu thất bại');
      return res.redirect('/admin/user');
    } else {
      req.flash('errors', 'Mật khẩu không trùng khớp');
      return res.redirect('/admin/user');
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    const user = await UserServices.delete(id);
    if (user) {
      req.flash('success', 'Xóa người dùng thành công');
      return res.redirect('/admin/user');
    }
    req.flash('errors', 'Xóa người dùng thất bại');
    return res.redirect('/admin/user');
  }
}

module.exports = new UserController();
