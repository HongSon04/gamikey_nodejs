const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const Category = require('./category.model');
const Brand = require('./brand.model');
const SubCategory = require('./subCategory.model');

mongoose.plugin(slug);

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discount_price: { type: Number, default: 0 },
    image: { type: String, required: true },
    slug: { type: String, slug: 'name', unique: true },
    quantity: { type: Number, default: 0 },
    purcharsed: { type: Number, default: 0 },
    type: {
      type: String,
      enum: ['Tài Khoản', 'Nâng Cấp', 'Key'],
    },
    slug_type: {
      type: String,
      slug: 'type',
    },
    brand_id: {
      type: String,
      ref: 'Brand',
      default: null,
    },
    category_id: { type: String, ref: 'Category' },
    sub_category_id: {
      type: String,
      ref: 'SubCategory',
    },
    description: { type: String, required: true },
    short_description: { type: String, required: true },
    start_discount: { type: Date, default: null },
    end_discount: { type: Date, default: null },
    status: {
      type: String,
      enum: ['0', '1'],
      default: '1', // ? 0: inactive, 1: active
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    expiredAt: {
      type: Date,
      default: null,
      expires: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model('Product', ProductSchema, 'products');

module.exports = Product;
