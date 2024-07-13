const Category = require("../../controller/PRODUCTS/categoriesController");
const asyncWrapper = require("../../middleware/PRODUCTS/async");

// Create a Category
const createCategory = asyncWrapper(async (req, res) => {
    let category = new Category({
        male: req.body.male,
        female: req.body.female,
        bags: req.body.bags,
        hats: req.body.hats
    });

    category = await category.save();
    res.status(201).json({ msg: "Category created", category });
});

module.exports = { createCategory };
