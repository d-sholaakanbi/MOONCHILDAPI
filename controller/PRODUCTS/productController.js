const Products = require("../../models/PRODUCTS/products");
const asyncWrapper = require("../../middleware/PRODUCTS/async");

// Get all products
const getAllProducts = asyncWrapper(async (req, res) => {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 

    const skip = (page - 1) * limit;

    const products = await Products.find()
        .select('title price description category images categoryId countInStock')
        .skip(skip)
        .limit(limit)
        .exec();

    const numOfProducts = await Products.countDocuments();
    res.status(200).json({ numOfProducts, products });
});

// Get a single product
const getProduct = asyncWrapper(async (req, res) => {
    const { productId } = req.params;
    const product = await Products.findOne({ _id: productId });
    if (!product) {
        return res.status(404).json({ msg: `Product with the id: ${productId} not found` });
    }
    res.status(200).json({ product });
});

// Create a product
const createProduct = asyncWrapper(async (req, res) => {
    const productData = req.body;

    const product = new Products({
        title: productData.title,
        price: productData.price,
        description: productData.description,
        category: {
            id: productData.category.id,
            name: productData.category.name,
            image: productData.category.image // Directly using the provided image URL
        },
        images: productData.images, // Directly using the provided image URLs array
        categoryId: productData.categoryId,
        countInStock: productData.countInStock // Ensure to add countInStock
    });

    // Save product to database
    await product.save();
    res.status(201).json({ success: true, data: product });
});

// Update a product
const updateProduct = asyncWrapper(async (req, res) => {
    const { productId } = req.params;
    const product = await Products.findOneAndUpdate(
        { _id: productId },
        req.body,
        { new: true, runValidators: true }
    );
    res.status(200).json({ msg: "Product updated successfully", product });
});

// Delete a product
const deleteProduct = asyncWrapper(async (req, res) => {
    const { productId } = req.params;
    const product = await Products.findOneAndDelete({ _id: productId });
    res.status(200).json({ msg: "Product deleted", product });
});

// Exports
module.exports = {
    getAllProducts,
    updateProduct,
    deleteProduct,
    getProduct,
    createProduct,
};
