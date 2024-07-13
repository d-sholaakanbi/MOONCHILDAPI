const router = require("express").Router();
const {createCategory} = require ("../../controller/PRODUCTS/categoriesController");
const { validateCategory } = require('../../middleware/PRODUCTS/categoryValidator');


router.route("/").post(createCategory, validateCategory);
// router.route("/:productId").get(getProduct).patch(updateProduct).delete(deleteProduct);

module.exports = router;
