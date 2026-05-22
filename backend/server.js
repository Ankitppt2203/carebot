const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
console.log(process.env.MONGO_URI);

const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

// ================= MIDDLEWARE =================
app.use(express.json());

app.use(cors({
    origin: "https://guileless-florentine-d7e633.netlify.app",
    credentials: true
}));

// ================= ROUTES =================
app.use("/api", authRoutes);
app.use("/api", chatRoutes);

// ================= MONGODB CONNECTION =================
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected ✅"))
    .catch((err) => console.log(err));

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
    res.send("CareBot Backend Running 🚀");
});

// ================= PROTECTED ROUTE =================
app.get("/api/profile", authMiddleware, (req, res) => {
    res.json({
        message: "Welcome to protected profile route 🔐",
        userId: req.user.id
    });
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});