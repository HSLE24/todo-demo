const express = require("express");
const router = express.Router();
const taskApi = require("./task.api");
const userApi = require("./user.api");
const authController = require("../controller/auth.controller");
const { model } = require("mongoose");

router.use("/tasks", taskApi);

router.use("/user", userApi);

router.get("/me", authController.authenticate);

module.exports = router;
