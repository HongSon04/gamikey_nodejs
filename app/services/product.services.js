const Product = require('../model/Product.model');

const getAllProducts = async () => {
  return await Product.find({ deletedAt: null });
};

const storeProduct = async (data) => {
  const Product = new Product({
    name: data.name,
    status: data.status,
    image: data.image,
  });
  return await Product.save();
};

const getProductById = async (id) => {
  return await Product.findById(id);
};

const updateProduct = async (id, data) => {
  if (data.image != null) {
    // ? Delete old image
    const Product = await Product.findById(id);
    if (Product.image != null) {
      return await Product.updateOne(
        {
          _id: id,
        },
        {
          name: data.name,
          status: data.status,
          image: data.image,
        },
      );
    }
  } else {
    return await Product.updateOne(
      {
        _id: id,
      },
      {
        name: data.name,
        status: data.status,
      },
    );
  }
};

const deleteProductByID = async (id) => {
  return await Product.updateOne({ _id: id }, { deletedAt: Date.now() });
};

module.exports = {
  getAllProducts,
  getProductById,
  storeProduct,
  updateProduct,
  deleteProductByID,
};
