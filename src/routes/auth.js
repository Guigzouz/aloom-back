"use strict";

const express = require("express");
const router = express.Router();
const { authController } = require("../controllers/index");

router.get("/", authController.create);

module.exports = router;
