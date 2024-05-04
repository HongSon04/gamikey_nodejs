const User = require('../model/user.model');
class UserServices {
  async getAll() {
    return await User.find();
  }
  async getOne(id) {
    return await User.findById(id);
  }
  async store(data) {
    const user = new User();
    user.name = data.name;
    user.email = data.email;
    user.phone = data.phone;
    user.role = data.role;
    user.avatar = data.image;
    user.password = data.password;
    await user.save();
    return user;
  }
  async update(id, data) {
    const user = await User.findById(id);
    if (!user) {
      return false;
    }
    user.name = data.name;
    user.email = data.email;
    user.phone = data.phone;
    user.role = data.role;
    user.image = data.image;
    await user.save();
    return user;
  }

  async updatePassword(id, data) {
    const user = await User.findById(id);
    if (!user) {
      return false;
    }
    user.password = data.password;
    await user.save();
    return user;
  }
}

module.exports = new UserServices();
