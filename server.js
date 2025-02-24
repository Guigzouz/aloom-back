const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const router = require("./src/routes");
const { metricsMiddleware, metricsHandler } = require("./src/metrics");

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://159.89.30.66",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(express.json());
app.use(
  cors({
    origin: "http://159.89.30.66",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Apply Prometheus metrics middleware
app.use(metricsMiddleware);

// Define Routes
app.use("/", router);
app.get("/", (req, res) => res.send("Hello World"));

// Expose /metrics endpoint for Prometheus
app.get("/metrics", metricsHandler);

httpServer.listen(3000, () => {
  console.log("Server started on port 3000");
});

// Socket.io connection handling
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
