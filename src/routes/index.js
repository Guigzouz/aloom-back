"use strict";

const express = require("express");
const router = express.Router();
const auth = require("./auth");
const friends = require("./friends");
const users = require("./users");
const posts = require("./posts");
const files = require("./files");

router.use("/auth", auth);
router.use("/files", files);
router.use("/friendship", friends);
router.use("/users", users);
router.use("/posts", posts);
module.exports = router;
