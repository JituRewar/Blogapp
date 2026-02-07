import pdf from "pdf-poppler";
import fs from "fs";
import path from "path";

export async function pdfToImages(pdfPath) {
  const outputDir = "server/uploads/images";

  // clean old images
  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true, force: true });
  }
  fs.mkdirSync(outputDir, { recursive: true });

  const options = {
    format: "png",
    out_dir: outputDir,
    out_prefix: "page",
    page: null,
  };

  await pdf.convert(pdfPath, options);

  // SORT files correctly
  return fs
    .readdirSync(outputDir)
    .filter((f) => f.endsWith(".png"))
    .sort((a, b) => {
      const n1 = parseInt(a.replace(/\D/g, ""));
      const n2 = parseInt(b.replace(/\D/g, ""));
      return n1 - n2;
    })
    .map((f) => path.join(outputDir, f));
}
