const express = require("express");
const app = express();

const authRoutes = require("./src/routes/index.js");
app.use("/auth", authRoutes);

app.get("/", (req, res) => res.send("Hello World"));

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
