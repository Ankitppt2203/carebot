# 🩺 CareBot — AI-Powered Health Assistant

## 🚀 Project Overview

CareBot is an intelligent, full-stack web application designed to provide users with basic health guidance based on their symptoms. It combines a modern frontend interface, a secure backend API, and a locally running AI model (via Ollama) to deliver real-time, context-aware responses.

Unlike generic chatbots, CareBot uses a **Retrieval-Augmented Generation (RAG)** approach — meaning it doesn’t just rely on AI alone, but also incorporates structured health data to produce more reliable and controlled responses.

This project demonstrates real-world AI system design and is highly suitable for showcasing in internships, placements, and technical interviews.

---

## 🧠 Key Features

### 🔐 Authentication System

* User registration and login
* Password hashing using bcrypt
* JWT-based authentication for secure API access

### 💬 AI Chat Interface

* Interactive chat UI similar to ChatGPT
* Real-time communication with backend
* Supports user queries about symptoms and health advice

### 🧠 Local AI Integration (Ollama)

* Uses Mistral / Phi3 model locally
* No API cost or rate limits
* Fully offline AI capability

### 📊 RAG (Retrieval-Augmented Generation)

* Custom dataset of symptoms and advice
* Backend retrieves relevant data based on user query
* AI uses this context to generate better responses

### 🧾 Dataset-Based Intelligence

* Structured JSON dataset
* Includes:

  * Symptom
  * Information
  * Advice
  * Warning

---

## 🏗️ Tech Stack

### Frontend

* HTML, CSS, JavaScript
* Responsive UI
* LocalStorage for token management

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### AI Layer

* Ollama (Local LLM runtime)
* Mistral / Phi3 model

---

## 📁 Project Structure

```
carebot/
│
├── backend/
│   ├── server.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── chatRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   ├── data/
│   │   ├── healthData.json
│
├── frontend/
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── chat.html
│   ├── script.js
│
└── README.md
```

---

## ⚙️ How It Works

### 1️⃣ User Interaction

User types a message like:

> "I have fever and headache"

---

### 2️⃣ Backend Processing

* Message is received via `/api/chat`
* Token is verified using middleware
* Message is converted to lowercase

---

### 3️⃣ Dataset Matching (RAG Step)

Backend checks:

```js
healthData.filter(item =>
  message.includes(item.symptom)
)
```

If match found:

* Extracts info, advice, warning
* Builds context string

---

### 4️⃣ AI Prompt Construction

```text
Context:
Fever → advice...
Headache → advice...

User Question:
I have fever and headache
```

---

### 5️⃣ AI Response Generation

* Sent to Ollama (`/api/chat`)
* Model processes context + question
* Returns structured response

---

### 6️⃣ Frontend Display

* Response shown in chat bubble
* Smooth UI experience

---

## 📊 Example Dataset Format

```json
[
  {
    "symptom": "fever",
    "info": "Fever is usually caused by infection.",
    "advice": "Drink fluids and rest.",
    "warning": "Consult a doctor if it lasts more than 3 days."
  }
]
```

---

## 🚀 Getting Started

### ✅ Prerequisites

* Node.js installed
* MongoDB running
* Ollama installed

---

### 🔧 Step 1 — Install Dependencies

```bash
cd backend
npm install
```

---

### 🔧 Step 2 — Start MongoDB

```bash
mongod
```

---

### 🔧 Step 3 — Start Backend

```bash
npm run dev
```

---

### 🔧 Step 4 — Run Ollama

```bash
ollama run mistral
```

---

### 🔧 Step 5 — Open Frontend

Open:

```
frontend/login.html
```

---

## ⚡ Performance Optimization

To improve speed:

* Use smaller model (`phi3`)
* Reduce context size
* Limit dataset matches
* Warm up model before use

---

## 🔐 Security Features

* JWT authentication
* Password hashing
* Protected routes
* Middleware validation

---

## 🧠 Future Enhancements

### 🔥 High Priority

* Multi-symptom detection (already added)
* Chat memory (conversation history)
* Better matching logic (NLP-based)

### 🚀 Advanced

* Vector database (for advanced RAG)
* Voice input/output
* Image-based symptom detection

### 🌐 Deployment

* Frontend → Vercel / Netlify
* Backend → Render / Railway
* Database → MongoDB Atlas

---

## 💡 Learning Outcomes

This project demonstrates:

* Full-stack development
* API design
* Authentication systems
* AI integration
* RAG architecture
* Real-world problem solving

---

## 🎯 Why This Project Matters

CareBot is not just a chatbot — it is a **complete AI system** that combines:

* Data + Intelligence
* Backend + Frontend
* Logic + UX

This makes it a **strong portfolio project** for:

* SDE roles
* AI/ML roles
* Full-stack positions

---

## ⚠️ Disclaimer

CareBot provides general health guidance only.
It is **not a replacement for professional medical advice**.

---

## 👨‍💻 Author

Developed by: **Ankit Prajapati**

---

## ⭐ Final Thoughts

CareBot is a powerful demonstration of how modern AI systems are built. By combining structured datasets with language models, it creates a more reliable and user-focused experience.

This project can be further expanded into a startup-level product with features like telemedicine integration, appointment booking, and real-time health monitoring.

---

🔥 **You didn’t just build a project — you built an AI system.**
