// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// dotenv.config();

// const app = express();
// const PORT = 5000;

// /* ---------- Middleware ---------- */
// app.use(cors({
//   origin: "http://localhost:5173", // Vite frontend
//   credentials: true,
// }));
// app.use(express.json());

// /* ---------- Gemini Setup ---------- */
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// /* ---------- Routes ---------- */
// app.post("/api/chat", async (req, res) => {
//   try {
//     const { message } = req.body;

//     if (!message) {
//       return res.status(400).json({ error: "Message is required" });
//     }

//     const model = genAI.getGenerativeModel({
//       model: "gemini-1.5-flash",
//     });

//     const result = await model.generateContent(message);
//     const response = result.response.text();

//     res.json({ reply: response });
//   } catch (error) {
//     console.error("Gemini Error:", error);
//     res.status(500).json({ error: "AI response failed" });
//   }
// });

// /* ---------- Health Check ---------- */
// app.get("/", (req, res) => {
//   res.send("✅ Gemini AI Server is running");
// });

// /* ---------- Start Server ---------- */
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });




import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const PORT = 5000;

/* ---------- Middleware ---------- */
app.use(cors({
  origin: "http://localhost:5173",
}));
app.use(express.json());

/* ---------- Gemini Setup ---------- */
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY missing in .env");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/* ---------- Routes ---------- */
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: message }],
        },
      ],
    });

    const reply =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      console.error("❌ Empty Gemini response:", result);
      return res.status(500).json({ error: "Empty AI response" });
    }

    res.json({ reply });
  } catch (error) {
    console.error("🔥 Gemini Error:", error);
    res.status(500).json({ error: "AI response failed" });
  }
});

/* ---------- Health Check ---------- */
app.get("/", (req, res) => {
  res.send("✅ Gemini AI Server is running");
});

/* ---------- Start Server ---------- */
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
