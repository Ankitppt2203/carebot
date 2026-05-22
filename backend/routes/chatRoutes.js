const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const healthData = require("../data/healthData.json");


// ================= CHAT ROUTE =================
router.post("/chat", authMiddleware, async (req, res) => {

    try {

        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                reply: "Message is required"
            });
        }

        const userMessage = message.toLowerCase();

        // ================= INSTANT REPLIES =================
        const instantReplies = {

            "hello":
                "Hello 👋 I am CareBot. How can I help you today?",

            "hi":
                "Hi 😊 How are you feeling today?",

            "who are you":
                "I am CareBot, your AI healthcare assistant.",

            "thank you":
                "You're welcome 💙 Stay healthy!",

            "bye":
                "Take care 👋 Have a healthy day!",

            "i have fever":
                "Fever is usually caused by infection or weakness in the body. Please take proper rest, drink plenty of fluids, and monitor your body temperature regularly.",

            "i feel headache":
                "Headache may happen due to stress, dehydration, or lack of sleep. Try resting and drinking enough water.",

            "i have cough":
                "Drink warm water and avoid cold food. If cough continues for many days, consult a doctor.",

            "i have cold":
                "Common cold usually improves with rest and hydration. Avoid cold exposure and take proper sleep.",

            "i feel weak":
                "Weakness can happen due to poor diet, dehydration, or stress. Eat nutritious food and rest properly."

        };

        // ================= QUICK REPLY =================
        if (instantReplies[userMessage]) {

            return res.json({
                reply: instantReplies[userMessage]
            });

        }

        // ================= HEALTH DATA SEARCH =================
        const result = healthData.find(item =>
            userMessage.includes(item.symptom)
        );

        let reply = "";

        if (result) {

            reply = `
Info: ${result.info}

Advice: ${result.advice}

Warning: ${result.warning}
`;

        } else {

            reply =
                "I could not find exact health information. Please consult a doctor for proper medical advice.";

        }

        // ================= SEND RESPONSE =================
        res.json({
            reply
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            reply: "AI Server error"
        });

    }

});

module.exports = router;