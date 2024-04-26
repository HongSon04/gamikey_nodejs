const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      slug: 'name',
    },
    status: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

const Brand = mongoose.model('Brand', brandSchema, 'brands');

module.exports = Brand;
