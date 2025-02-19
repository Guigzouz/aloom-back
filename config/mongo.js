const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

const mongoURI = process.env.MONGO_URI || "mongodb://mongo:27017/aloom-mongo";

const conn = mongoose.createConnection(mongoURI);

let gfs;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads"); // Store images in "uploads" collection
});

module.exports = { gfs, conn };
