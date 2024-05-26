const express = require("express");
const userController = require("../controller/user.controller");
const authController = require("../controller/auth.controller");
const router = express.Router();

router.post("/", userController.checkUser);

router.post("/register", userController.registerUser);

router.post("/login", userController.loginWithEmail);

router.get("/me", authController.authenticate, userController.getUser);

module.exports = router;
