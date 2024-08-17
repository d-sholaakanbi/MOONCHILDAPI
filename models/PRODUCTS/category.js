const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      image: {
        type: String,
      }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
