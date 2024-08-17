const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true  
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
    images: {type: [String]},
    categoryId: {
        type: String,
        ref: 'Category',
        required: true,
    }
},{ timestamps: true });

module.exports = mongoose.model('Product', productSchema);