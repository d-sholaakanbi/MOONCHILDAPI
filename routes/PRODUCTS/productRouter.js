const router = require('express').Router();
const {
    getProductsByCategory, 
    getAllProducts, 
    updateProduct, 
    deleteProduct, 
    getProduct, 
    createProduct
} = require('../../controller/PRODUCTS/productController');

// Route to get all products or filter by category
router.route('/')
    .get(getAllProducts)  // Use query parameters for pagination and sorting
    .post(createProduct); // Create a new product

// Route to get a product by ID, update, or delete a product
router.route('/:productId')
    .get(getProduct)    // Get a single product by ID
    .patch(updateProduct) // Update a product by ID
    .delete(deleteProduct); // Delete a product by ID

// Route to get products by category ID
router.route('/categories/:categoryId')
    .get(getProductsByCategory);

module.exports = router;
