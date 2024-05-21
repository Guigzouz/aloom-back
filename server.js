const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const router = require("./src/routes");

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(express.json());
app.use(cors());

// Assuming authRoutes is defined somewhere else
app.use("/auth", router);

app.get("/", (req, res) => res.send("Hello World"));

httpServer.listen(3000, () => {
  console.log("Server started on port 3000");
});

// when the server restarts, socket.io reconnects the users automatically
io.on("connection", onConnected);
const socketsConnected = new Set();

function onConnected(socket) {
  console.log("Socket connected: ", socket.id);
  socketsConnected.add(socket.id);

  io.emit("clients-total", socketsConnected.size);

  socket.on("disconnect", () => {
    console.log("Socket disconnected: ", socket.id);
    socketsConnected.delete(socket.id);
    io.emit("clients-total", socketsConnected.size);
  });
}
