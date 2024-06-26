const Product = require('../model/product.model');

const getAllProducts = async () => {
  // If Have sub_category_id then populate it
  return await Product.find({ deletedAt: null }).populate(
    'category_id',
    'name',
  );
};

const getProductBySlug = async (slug) => {
  return await Product.findOne({ slug: slug, status: '1' });
};

const getNearProductByCategory = async (category_id) => {
  return await Product.find({ category_id: category_id, status: '1' })
    .select('name image price slug purcharsed')
    .limit(6)
    .populate('category_id', 'name');
};
const storeProduct = async (data) => {
  const product = new Product({
    name: data.name,
    status: data.status,
    image: data.image,
    price: data.price,
    discount_price: data.discount_price,
    type: data.type,
    category_id: data.category_id,
    sub_category_id: data.sub_category_id,
    brand_id: data.brand_id,
    description: data.description,
    short_description: data.short_description,
    start_discount: data.start_discount,
    end_discount: data.end_discount,
    status: data.status,
    position: data.position,
  });

  return await product.save();
};

const getProductById = async (id) => {
  try {
    return await Product.findOne({ _id: id });
  } catch (error) {
    return null;
  }
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
          price: data.price,
          discount_price: data.discount_price,
          type: data.type,
          category_id: data.category_id,
          sub_category_id: data.sub_category_id,
          brand_id: data.brand_id,
          description: data.description,
          short_description: data.short_description,
          start_discount: data.start_discount,
          end_discount: data.end_discount,
          status: data.status,
          position: data.position,
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
        price: data.price,
        discount_price: data.discount_price,
        type: data.type,
        category_id: data.category_id,
        sub_category_id: data.sub_category_id,
        brand_id: data.brand_id,
        description: data.description,
        short_description: data.short_description,
        start_discount: data.start_discount,
        end_discount: data.end_discount,
        position: data.position,
        status: data.status,
      },
    );
  }
};

const deleteProductByID = async (id) => {
  return await Product.updateOne(
    { _id: id },
    {
      expiredAt: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
      deletedAt: new Date(),
    },
  );
};

const getAllTrashProductsServices = async () => {
  return await Product.find({ deletedAt: { $ne: null } })
    .populate('category_id', 'name')
    .populate('sub_category_id', 'name')
    .populate('brand_id', 'name');
};

const restoreProductByIDServies = async (id) => {
  return await Product.updateOne(
    { _id: id },
    { deletedAt: null, expiredAt: null },
  );
};

const deleteProductPermanentlyServices = async (id) => {
  return await Product.deleteOne({ _id: id });
};

module.exports = {
  getAllProducts,
  getProductById,
  storeProduct,
  updateProduct,
  deleteProductByID,
  getAllTrashProductsServices,
  restoreProductByIDServies,
  deleteProductPermanentlyServices,
  getProductBySlug,
  getNearProductByCategory,
};
