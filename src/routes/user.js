const express = require("express");
const router = new express.Router();
const userController = require("../controller/userController");
const auth = require("../middleware/auth");

// await cloudinary.uploader.upload(str, {})
router.post("/api/v1/user/register", userController.register);
router.post("/api/v1/user/login", userController.login);
router.post("/api/v1/user/logout", auth, userController.logout);

module.exports = router;
