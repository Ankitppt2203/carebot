const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const fetch = require("node-fetch");
const healthData = require("../data/healthData.json");

router.post("/chat", authMiddleware, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Message is required" });
    }

    const userMessage = message.toLowerCase();

    
 const instantReplies = {

  "hello": "Hello 👋 I am CareBot. How can I help you today?",

  "hi": "Hi 😊 How are you feeling today?",

  "who are you": "I am CareBot, your AI healthcare assistant.",

  "thank you": "You're welcome 💙 Stay healthy!",

  "bye": "Take care 👋 Have a healthy day!",

  "i have fever":
    "Fever is usually caused by infection or weakness in the body. Please take proper rest, drink plenty of fluids, and monitor your body temperature regularly. You may take paracetamol if needed. If the fever continues for more than 2–3 days, consult a doctor immediately.",

  "i feel headache":
    "Headache may happen due to stress, dehydration, lack of sleep, or fever. Try to rest in a calm environment and drink enough water. Avoid excessive screen time for some time. If the pain becomes severe or frequent, consult a healthcare professional.",

  "i have cough":
    "Cough is commonly caused by cold, throat irritation, or infection. Drink warm water and avoid cold food or drinks. Taking proper rest may help improve symptoms. If the cough lasts for more than a week or becomes severe, consult a doctor.",

  "i have cold":
    "Common cold is usually a viral infection and often improves with rest and hydration. Drink warm fluids and avoid cold exposure. Maintain proper hygiene and take enough sleep. If symptoms worsen or breathing difficulty occurs, seek medical help.",

  "i feel weak":
    "Weakness can happen due to poor diet, dehydration, stress, or illness. Try to eat nutritious food, drink enough water, and take proper rest. Avoid overexertion for some time. If weakness continues for many days, consult a doctor for proper evaluation."

};


// ⚡ Instant response check
if (instantReplies[userMessage]) {
  return res.json({
    reply: instantReplies[userMessage]
  });
}

    // 🔍 Find matching symptom
    const result = healthData.find(item =>
      userMessage.includes(item.symptom)
    );

    // 🧠 Prepare context
    let context = "";

    if (result) {
      context = `
Info: ${result.info}
Advice: ${result.advice}
Warning: ${result.warning}
`;
    } else {
      context = "No specific data found. Give general safe advice.";
    }

    // 🤖 Call Ollama with CONTEXT (IMPORTANT FIX)
    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistral",
        messages: [
          {
            role: "system",
            content:
              "You are CareBot, a helpful health assistant. Use the given context to answer clearly. Always give safe advice and suggest consulting a doctor for serious conditions."
          },
          {
            role: "user",
            content: `Context:\n${context}\n\nUser Question:\n${message}`
          }
        ],
        stream: false
      })
    });

    const data = await response.json();

    console.log("🧠 Ollama Response:", data);

    const aiReply =
      data.message?.content || "No response from AI";

    res.json({ reply: aiReply });

  } catch (error) {
    console.error("❌ ERROR:", error);
    res.status(500).json({ reply: "AI Server error" });
  }
});

module.exports = router;