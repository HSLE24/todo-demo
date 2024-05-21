const express = require("express");
const router = express.Router();
const taskApi = require("./task.api");
const { model } = require("mongoose");

router.use("/tasks", taskApi);

module.exports = router;
