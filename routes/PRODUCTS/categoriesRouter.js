const express = require('express');
const router = express.Router();
const {
    createCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory,
    getCategoryProducts
} = require('../../controller/PRODUCTS/categoriesController');

// Define your routes
router.post('/', createCategory);
router.get('/', getAllCategories);
router.get('/:categoryId', getCategory);
router.patch('/:categoryId', updateCategory);
router.delete('/:categoryId', deleteCategory);
router.get('/categories/:categoryid/products', getCategoryProducts); 

module.exports = router;
