const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const fetch = require("node-fetch");

router.post("/chat", authMiddleware, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Message is required" });
    }

    // ✅ Use /api/chat instead of /api/generate
    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistral",
        messages: [
          {
            role: "user",
            content: message
          }
        ],
        stream: false
      })
    });

    const data = await response.json();

    console.log("🧠 Ollama Chat Response:", data);

    // ✅ Correct extraction
    const aiReply = data.message?.content || "No response from AI";

    res.json({ reply: aiReply });

  } catch (error) {
    console.error("❌ FINAL ERROR:", error);
    res.status(500).json({ reply: "AI Server error" });
  }
});

module.exports = router;