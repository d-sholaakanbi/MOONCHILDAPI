const Product = require("../../models/PRODUCTS/products");
const asyncWrapper = require("../../middleware/PRODUCTS/async");

// Get all products
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

// Get a single product
const getProduct = asyncWrapper(async (req, res) => {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ msg: `Product with the id: ${productId} not found` });
    }
    res.status(200).json({ product });
});

// Create a Product
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

// Update a Product
const updateProduct = asyncWrapper(async (req, res) => {
    const { productId } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        req.body,
        { new: true, runValidators: true } // Return the updated document and run validators
    );

    if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ success: true, msg: "Product updated successfully", product: updatedProduct });
});

// Get products by category
const getProductsByCategory = asyncWrapper(async (req, res) => {
    const { categoryid } = req.params;
    const products = await Product.find({ categoryId: categoryid });
    if (!products.length) {
        return res.status(404).json({ message: 'No products found for this category' });
    }
    res.status(200).json(products);
});

// Delete a product
const deleteProduct = asyncWrapper(async (req, res) => {
    const { productId } = req.params;
    const product = await Product.findByIdAndDelete(productId);
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
