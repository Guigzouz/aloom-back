"use strict";

const express = require("express");
const router = express.Router();
const { userController } = require("../controllers/index");

router.get("/:userId", userController.getUserInformations);

module.exports = router;
