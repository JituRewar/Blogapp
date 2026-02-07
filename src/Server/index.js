import dotenv from "dotenv";
dotenv.config();

import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import { pdfToImages } from "./pdfToImages.js";
import { runOCR } from "./ocr.js";

const app = express();

// Allow frontend (Vite default port)
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

console.log("🔥 PDF OCR Backend Started");

const upload = multer({
  dest: "server/uploads/",
});

app.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No PDF uploaded" });
    }

    const pdfPath = req.file.path;

    // Convert PDF → Images
    const imagePaths = await pdfToImages(pdfPath);

    const pages = [];

    for (let i = 0; i < imagePaths.length; i++) {
      const text = await runOCR(imagePaths[i]);
      pages.push({
        page: i + 1,
        text,
      });
    }

    // Cleanup uploaded PDF
    fs.unlinkSync(pdfPath);

    res.json({ pages });
  } catch (error) {
    console.error("❌ OCR Error:", error);
    res.status(500).json({ error: "Failed to extract PDF text" });
  }
});

app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
