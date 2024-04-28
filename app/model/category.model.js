const e = require('express');
const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      slug: 'name',
      slugPaddingSize: 3,
      unique: true,
    },
    status: {
      type: String,
      enum: ['0', '1'],
      default: '1', // ? 0: inactive, 1: active
    },
    meta_title: {
      type: String,
      slug: 'name',
    },
    meta_description: {
      type: String,
      slug: 'description',
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
  { timestamps: true },
);

// ? Deleted If Datenow >= expiredAt

const Category = mongoose.model('Category', CategorySchema, 'categories');

module.exports = Category;
