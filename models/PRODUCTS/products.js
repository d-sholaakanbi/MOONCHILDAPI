const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true  // Ensures that each product ID is unique
    },
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
    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
      },
    category: {
        id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,  // URL of the image
            required: true
        }
    },
    images: [{
        type: String  // Array of image URLs
    }],
    categoryId: {
        type: Number,
        required: true
    },
  
},{ timestamps: true });

module.exports = mongoose.model('Product', productSchema);