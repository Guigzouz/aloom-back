const mongoose = require("mongoose");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");

const mongoURI =
  process.env.MONGO_URI || "mongodb://localhost:27017/aloom-files";

// Create a Mongoose connection
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;
let gridFSBucket;

conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");

  gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });

  console.log("✅ GridFS initialized successfully");
});

// Configure storage engine for multer-gridfs-storage
const storage = new GridFsStorage({
  url: mongoURI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: async (req, file) => {
    try {
      console.log("📂 Storing file in GridFS...", file.originalname);
      const storedFile = {
        filename: `${Date.now()}-${file.originalname}`,
        bucketName: "uploads",
      };
      console.log("✅ File metadata prepared:", storedFile);
      return storedFile;
    } catch (error) {
      console.error("❌ Storage error:", error);
      return Promise.reject(new Error("GridFS storage failed"));
    }
  },
});

const upload = multer({ storage });

// Upload file controller
const uploadFile = (req, res) => {
  console.log("📤 Uploading file...");
  if (!req.file) {
    console.error("❌ No file received!");
    return res.status(400).json({ error: "No file uploaded" });
  }

  console.log("✅ Uploaded file:", req.file);
  res.status(201).json({
    message: "File uploaded successfully",
    file: req.file,
  });
};

// Get file controller
const getFile = async (req, res) => {
  console.log("📥 Fetching file...");
  try {
    if (!gfs || !gridFSBucket) {
      console.error("❌ GridFS not initialized");
      return res.status(500).json({ error: "GridFS not initialized" });
    }

    const file = await gfs.files.findOne({ filename: req.params.filename });

    if (!file) {
      console.error("❌ File not found");
      return res.status(404).json({ message: "File not found" });
    }

    res.set("Content-Type", file.contentType);
    const readStream = gridFSBucket.openDownloadStream(file._id);
    readStream.pipe(res);
  } catch (error) {
    console.error("❌ Error retrieving file:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports = { uploadFile, getFile, upload };
