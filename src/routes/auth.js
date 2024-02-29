"use strict";

const express = require("express");
const router = express.Router();
const { authController } = require("../controllers/index");

router.get("/", authController.hello);
router.post("/", authController.createUser);
router.post("/login", authController.login);

module.exports = router;
