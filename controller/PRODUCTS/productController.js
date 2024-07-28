const Product = require("../../models/PRODUCTS/products");
const asyncWrapper = require("../../middleware/PRODUCTS/async");

// Get all products with pagination
const getAllProducts = asyncWrapper(async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const skip = (page - 1) * limit;

    const products = await Product.find()
        .select('title price description category images categoryId countInStock')
        .skip(skip)
        .limit(limit)
        .exec();

    const numOfProducts = await Product.countDocuments();
    res.status(200).json({ numOfProducts, products });
});

// Get a single product by custom ID
const getProduct = asyncWrapper(async (req, res) => {
    const { productid } = req.params;

    try {
        const product = await Product.findOne({ id: productid });

        if (!product) {
            return res.status(404).json({ msg: `Product with the id: ${productid} not found` });
        }
        res.status(200).json(product);  // Return the actual product object
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new product
const createProduct = asyncWrapper(async (req, res) => {
    const {
        id, title, price, description, countInStock, category, images, categoryId
    } = req.body;

    // Validate the presence of required fields
    if (!id || !title || !price || !description || !countInStock || !category || !images || !categoryId) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new product instance
    const product = new Product({
        id,
        title,
        price,
        description,
        countInStock,
        category: {
            id: category.id,
            name: category.name,
            image: category.image // Directly using the provided image URL
        },
        images, // Directly using the provided image URLs array
        categoryId
    });

    // Save the product to the database
    try {
        await product.save();
        res.status(201).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ error: 'Error creating product', details: error.message });
    }
});

// Update a product by custom ID
const updateProduct = asyncWrapper(async (req, res) => {
    const { productId } = req.params;

    try {
        const updatedProduct = await Product.findOneAndUpdate(
            { id: productId },
            req.body,
            { new: true, runValidators: true } // Returns the updated document and runs validation
        );

        if (!updatedProduct) {
            return res.status(404).json({ msg: `Product with the id: ${productId} not found` });
        }
        res.status(200).json({ msg: "Product updated successfully", updatedProduct });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get products by category ID
const getProductsByCategory = asyncWrapper(async (req, res) => {
    const { categoryId } = req.params;
    const products = await Product.find({ categoryId: categoryId }); // Fix field name to match schema

    if (!products.length) {
        return res.status(404).json({ message: 'No products found for this category' });
    }
    res.status(200).json(products);
});

// Delete a product by custom ID
const deleteProduct = asyncWrapper(async (req, res) => {
    const { productId } = req.params;
    const product = await Product.findOneAndDelete({ id: productId }); // Use custom ID for deletion

    if (!product) {
        return res.status(404).json({ msg: `Product with the id: ${productId} not found` });
    }
    res.status(200).json({ msg: "Product deleted", product });
});

// Exports
module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory
};
