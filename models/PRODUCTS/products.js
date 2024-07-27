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
    images: [{
        type: String  // Array of image URLs
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }

},{ timestamps: true });

module.exports = mongoose.model('Product', productSchema);