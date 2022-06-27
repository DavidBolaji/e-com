const express = require("express");
const router = new express.Router();
const logoController = require("../controller/logoController");
const upload = require("../utils/multer");
const auth = require("../middleware/auth");
const catchAsyncError = require("../utils/error");

router.post(
  "/api/v1/logo",
  auth,
  upload.single("images"),
  logoController.store,
  catchAsyncError
);

router.get("/api/v1/logo", logoController.getAll);

module.exports = router;
