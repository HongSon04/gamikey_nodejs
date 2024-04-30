const Product = require('../model/product.model');
const ProductAccount = require('../model/product_account.model');
class ProductAccountServices {
  async getAllProductAccount() {
    console.log(ProductAccount.find());
  }

  async getProductAccountByIdProduct(id) {
    return (await ProductAccount.find({ product_id: id })) || '';
  }

  async getProductAccountById(id) {
    return (await ProductAccount.findOne({ _id: id })) || '';
  }

  async store(data) {
    if (data.type_account == 'account') {
      // ? Create Many Account and call Product And increase quantity by 1
      const product = await Product.findOne({ _id: data.product_id });
      const increase = data.username.length;
      product.quantity += increase;
      await product.save();
      await data.username.forEach(async (item, index) => {
        const productAccount = new ProductAccount({
          product_id: data.product_id,
          username: item,
          password: data.password[index],
          type_account: data.type_account,
        });
        await productAccount.save();
      });
    } else {
      // ? Create Many Code and call Product And increase quantity by 1
      const product = await Product.findOne({ _id: data.product_id });
      const increase = data.code.length;
      product.quantity += increase;
      await product.save();

      await data.code.forEach(async (item) => {
        const productAccount = new ProductAccount({
          product_id: data.product_id,
          code: item,
          type_account: data.type_account,
        });
        await productAccount.save();
      });
    }
  }

  async update(id, data) {
    if (data.type_account == 'account') {
      console.log(data, id);
      await ProductAccount.updateOne(
        {
          _id: id,
        },
        {
          username: data.username,
          password: data.password,
        },
      );
    } else {
      await ProductAccount.updateOne(
        {
          _id: id,
        },
        {
          code: data.code,
        },
      );
    }
  }

  async delete(id) {
    return await ProductAccount.deleteOne({ _id: id });
  }
}

module.exports = new ProductAccountServices();
