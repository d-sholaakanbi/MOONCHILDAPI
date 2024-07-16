const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      image: {
        public_id: String,
        url: String,
      }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
