const express = require("express");
const cors = require("cors");
const http = require("http");
const authRoutes = require("./src/routes/index.js");
const { wss, handleUpgrade } = require("./src/helpers/websockets.js");

const app = express();

// wraps express app with a handler for websockets connections
const server = http.createServer(app);

// detects ws query
server.on("upgrade", handleUpgrade);

app.use(express.json());
app.use(cors());
app.use("/auth", authRoutes);

app.get("/", (req, res) => res.send("Hello World"));

server.listen(3000, () => {
  console.log("Server started on port 3000");
});
