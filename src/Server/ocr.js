import { createWorker } from "tesseract.js";

export async function runOCR(imagePath) {
  const worker = await createWorker("eng");

  const { data } = await worker.recognize(imagePath);
  await worker.terminate();

  return data.text
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
