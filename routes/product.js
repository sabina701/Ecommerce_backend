const express = require("express");
const router = express.Router();

const productController = require("../controllers/product");
const { isLoggedIn } = require("../middleware.js");

router.get("/", productController.getAllProducts);

router.post("/", isLoggedIn, productController.createProduct);

// My Products route
router.get("/my", isLoggedIn, productController.getMyProducts);

// router.get("/categories", productController.getCategories);

router.get("/category/:category", productController.getProductsByCategory);

router.get("/:id", productController.getSingleProduct);

router.put("/:id", isLoggedIn, productController.updateProduct);

router.delete("/:id", isLoggedIn, productController.deleteProduct);

module.exports = router;
