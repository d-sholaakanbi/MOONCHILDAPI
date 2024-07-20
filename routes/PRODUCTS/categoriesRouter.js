const router = require("express").Router();
const {
    createCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory
} = require("../../controller/PRODUCTS/categoriesController");

router.route("/")
    .post(createCategory)
    .get(getAllCategories);

router.route("/:categoryId")
    .get(getCategory)
    .patch(updateCategory)
    .delete(deleteCategory);

module.exports = router;
