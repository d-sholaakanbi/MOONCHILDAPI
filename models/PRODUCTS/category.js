const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
    male: {
        type: String,
    },
    female: {
        type: String,
    },
    bags: {
        type: String,
    },
    hats: {
        type: String,
    },



    
});

module.exports = mongoose.model('Category', categorySchema);