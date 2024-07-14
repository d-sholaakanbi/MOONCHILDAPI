// product.js
const mongoose = require('mongoose');
const categorySchema = require('../../models/PRODUCTS/category');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  images: {
    type: [String],
    required: true
  },
  categoryId: {
    type: Number,
    required: true
  },
  countInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  }
});

module.exports = mongoose.model('Product', productSchema);
