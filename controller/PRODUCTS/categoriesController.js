const Category = require('../../models/PRODUCTS/category');
const asyncWrapper = require('../../middleware/PRODUCTS/async');

// Create a Category
const createCategory = asyncWrapper(async (req, res) => {
    const { id, name, image } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'id is required' });
    }

    let category = new Category({
        id,
        name,
        image: {
            public_id: image.public_id,
            url: image.url
        }
    });

    category = await category.save();
    res.status(201).json({ msg: "Category created", category });
});

// Get all categories
const getAllCategories = asyncWrapper(async (req, res) => {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 

    const skip = (page - 1) * limit;

    const categories = await Category.find()
        .skip(skip)
        .limit(limit)
        .exec();

    const numOfCategories = await Category.countDocuments();
    res.status(200).json({ numOfCategories, categories });
});

// Get a single category
const getCategory = asyncWrapper(async (req, res) => {
    const { categoryId } = req.params;
    const category = await Category.findOne({ _id: categoryId });
    if (!category) {
        return res.status(404).json({ msg: `Category with the id: ${categoryId} not found` });
    }
    res.status(200).json({ category });
});

// Update a category
const updateCategory = asyncWrapper(async (req, res) => {
    const { categoryId } = req.params;
    const category = await Category.findOneAndUpdate(
        { _id: categoryId },
        req.body,
        { new: true, runValidators: true }
    );
    if (!category) {
        return res.status(404).json({ msg: `Category with the id: ${categoryId} not found` });
    }
    res.status(200).json({ msg: "Category updated successfully", category });
});

// Delete a category
const deleteCategory = asyncWrapper(async (req, res) => {
    const { categoryId } = req.params;
    const category = await Category.findOneAndDelete({ _id: categoryId });
    if (!category) {
        return res.status(404).json({ msg: `Category with the id: ${categoryId} not found` });
    }
    res.status(200).json({ msg: "Category deleted", category });
});

module.exports = { 
    createCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory
};
