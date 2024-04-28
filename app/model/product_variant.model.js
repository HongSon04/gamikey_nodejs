const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productVariantSchema = new mongoose.Schema({
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
  status: {
    type: String,
    required: true,
  },
},{timestamp: true});

const ProductVariant = mongoose.model('ProductVariant', productVariantSchema, 'product_variants');

module.exports = ProductVariant;
