const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

// Middleware (VERY IMPORTANT ORDER)
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", authRoutes);
app.use("/api", chatRoutes);

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/carebot")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

// Test Route
app.get("/", (req, res) => {
  res.send("CareBot Backend Running 🚀");
});

// Protected Test Route
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome to protected profile route 🔐",
    userId: req.user.id
  });
});

// Server Port
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});