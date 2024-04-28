const { Timestamp } = require('mongodb');
const monsgoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const ProductVariantItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      slug: 'name',
      unique: true,
    },
    product_id: {
      type: String,
      required: true,
      ref: 'Product',
    },
    product_variant_id: {
      type: String,
      required: true,
      ref: 'ProductVariant',
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamp: true },
);

const ProductVariantItem = mongoose.model(
  'ProductVariantItem',
  ProductVariantItemSchema,
  'product_variant_items',
);

module.exports = ProductVariantItem;
