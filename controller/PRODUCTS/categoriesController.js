const Category = require('../../models/PRODUCTS/category');
const asyncWrapper = require('../../middleware/PRODUCTS/async');

// Create a Category
const createCategory = asyncWrapper(async (req, res) => {
    const { name, image } = req.body;

    let category = new Category({
        name,
        image: {
            public_id: image.public_id,
            url: image.url
        }
    });

    category = await category.save();
    res.status(201).json({ msg: "Category created", category });
});

module.exports = { createCategory };
