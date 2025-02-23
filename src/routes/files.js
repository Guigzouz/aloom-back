// routes/files.js
"use strict";

const express = require("express");
const router = express.Router();
const upload = require("../helpers/multer");
const { uploadImage } = require("../controllers/files-controller");

router.post("/upload", upload.single("image"), uploadImage);

module.exports = router;
