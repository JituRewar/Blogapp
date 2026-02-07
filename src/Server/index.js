import dotenv from "dotenv";
dotenv.config();

import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import path from "path";
import { pdfToImages } from "./pdfToImages.js";
import { runOCR } from "./ocr.js";


const app = express();
app.use(cors());
app.use(express.json());
console.log("🔥 RUNNING PDF OCR BACKEND INDEX.JS");

const upload = multer({ dest: "server/uploads/" });

app.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const pdfPath = req.file.path;

    const imagePaths = await pdfToImages(pdfPath);
    const results = [];

    for (let i = 0; i < imagePaths.length; i++) {
      const text = await runOCR(imagePaths[i]);
      results.push({
        page: i + 1,
        text,
      });
    }

    
    fs.unlinkSync(pdfPath);

    res.json({ pages: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process PDF" });
  }
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
