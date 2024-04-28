const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);
const Category = require('./category.model');

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    slug: 'name',
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
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
}, {timestamps: true});

const SubCategory = mongoose.model(
  'SubCategory',
  subCategorySchema,
  'sub_categories',
);

module.exports = SubCategory;
