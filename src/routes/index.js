"use strict";

const express = require("express");
const router = express.Router();
const auth = require("./auth");
const friends = require("./friends");
const users = require("./users");

router.use("/auth", auth);
router.use("/friendship", friends);
router.use("/users", users);
module.exports = router;
