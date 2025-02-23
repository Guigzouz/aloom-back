// controllers/files-controller.js
const cloudinary = require("../helpers/cloudinary");

const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }

  cloudinary.uploader.upload(req.file.path, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: err,
      });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  });
};

module.exports = {
  uploadImage,
};
