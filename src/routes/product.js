const express = require("express");
const router = new express.Router();
const productController = require("../controller/productController");
const upload = require("../utils/multer");
const catchAsyncError = require("../utils/error");
const auth = require("../middleware/auth");

// await cloudinary.uploader.upload(str, {})
router.post(
  "/api/v1/product/create",
  auth,
  upload.single("images"),
  productController.create,
  catchAsyncError
);
router.get("/api/v1/product/find", productController.getProducts);
router.delete(
  "/api/v1/product/delete/:productId",
  auth,
  productController.deleteProduct
);
router.put(
  "/api/v1/product/update/:productId",
  auth,
  upload.single("images"),
  productController.updateProduct,
  catchAsyncError
);
router.get("/api/v1/product/find/:id", productController.getOneProduct);
// router.post('/api/v1/blog/login', userController.login, catchAsyncError)

module.exports = router;
