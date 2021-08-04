const express = require("express");
const router = express.Router();
const {
  getAllProductController,
  createAllProductController,
  updateProductController,
  getSingleProductController,
  deleteProductController,
} = require("../controller/product");

// get method
router.get("/", getAllProductController);

//Post method
router.post("/addProduct", createAllProductController);

// Put Method
router.put("/:id", updateProductController);

//Get product by id
router.get("/:id", getSingleProductController);

// Delete product by single id
router.delete("/:id", deleteProductController);

module.exports = router;
