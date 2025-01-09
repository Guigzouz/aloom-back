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
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust this based on where your frontend is running
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use("/", router);

app.get("/", (req, res) => res.send("Hello World"));

httpServer.listen(3000, () => {
  console.log("Server started on port 3000");
});

// when the server restarts, socket.io reconnects the users automatically
io.on("connection", onConnected);

function onConnected(socket) {
  console.log("Socket connected: ", socket.id);

  socket.on("joinRoom", ({ roomId }) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  socket.on("sendMessage", ({ roomId, sender, message }) => {
    console.log(`Message from ${sender} in room ${roomId}: ${message}`);
    socket.to(roomId).emit("receiveMessage", { sender, message });
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected: ", socket.id);
  });
}
