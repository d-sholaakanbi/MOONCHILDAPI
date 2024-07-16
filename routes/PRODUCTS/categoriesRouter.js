const router = require("express").Router();
const {
    createCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory
} = require("../../controller/PRODUCTS/categoriesController");
const { validateCategory } = require('../../middleware/PRODUCTS/categoryValidator');

router.route("/")
    .post(validateCategory, createCategory)
    .get(getAllCategories);

router.route("/:categoryId")
    .get(getCategory)
    .patch(validateCategory, updateCategory)
    .delete(deleteCategory);

module.exports = router;
