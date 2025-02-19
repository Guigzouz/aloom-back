const express = require("express");
const {
  uploadFile,
  getFile,
  upload,
} = require("../controllers/files-controller");
const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);
router.get("/:filename", getFile);

module.exports = router;
