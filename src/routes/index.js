"use strict";

const express = require("express");
const router = express.Router();
const auth = require("./auth");
const friends = require("./friends");

router.use("/auth", auth);
router.use("/friendship", friends);
module.exports = router;
