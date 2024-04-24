const mongoose = require('mongoose');
require('dotenv').config();

const checkConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Kết nối thành công');
  } catch (error) {
    console.log(error);
    console.log('Kết nối thất bại');
  }
};

module.exports = checkConnect;
