const ProductVariant = require('../model/product_variant.model');

const getProductVariantByIdProductService = async (id) => {
  return await ProductVariant.find({ product_id: id });
};

const getProductVariantByIdService = async (id) => {
  return await ProductVariant.findOne({ _id: id });
};

const getProductVariantByIdAndProductIdService = async (id, productId) => {
  return await ProductVariant.find(
    { _id: id, product_id: productId },
    { status: '1' },
  );
};

const deleteProductVariantByIdService = async (id) => {
  console.log(id);
  return await ProductVariant.deleteOne({ _id: id });
};

const storeProductVariantService = async (data) => {
  const productVariant = new ProductVariant({
    name: data.name,
    product_id: data.product_id,
    status: data.status,
  });
  return await productVariant.save();
};

const changeStatusProductVariantService = async (id) => {
  const productVariant = await ProductVariant.findOne({ _id: id });
  const status = productVariant.status === '1' ? '0' : '1';
  return await ProductVariant.updateOne({ _id: id }, { status: status });
};

const updateProductVariantService = async (id, data) => {
  return await ProductVariant.updateOne(
    { _id: id },
    { name: data.name, status: data.status },
  );
};

module.exports = {
  getProductVariantByIdProductService,
  getProductVariantByIdAndProductIdService,
  deleteProductVariantByIdService,
  storeProductVariantService,
  getProductVariantByIdService,
  changeStatusProductVariantService,
  updateProductVariantService,
};
