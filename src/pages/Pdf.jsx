import { useState } from "react";

export default function Pdf() {
  const [file, setFile] = useState(null);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setPages([]);

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const res = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Server error");
      }

      const data = await res.json();
      setPages(data.pages || []);
    } catch (err) {
      console.error(err);
      alert("Error extracting PDF text");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <header className="bg-slate-950 border-b border-slate-800 py-7">
        <h1 className="text-center text-2xl font-semibold text-slate-50">
          PDF → Text Extractor
        </h1>
      </header>

      <main className="max-w-4xl mx-auto px-5 py-10">
        <form
          onSubmit={handleSubmit}
          className="flex gap-4 items-center mb-10 max-sm:flex-col"
        >
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            required
            className="flex-1 px-4 py-3 rounded-lg bg-slate-950 border border-slate-800"
          />

          <button
            type="submit"
            className="px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? "Processing..." : "Upload"}
          </button>
        </form>

        <div className="space-y-5">
          {pages.map((p) => (
            <div
              key={p.page}
              className="bg-slate-950 border border-slate-800 rounded-xl p-6"
            >
              <h3 className="text-blue-400 font-semibold mb-2">
                Page {p.page}
              </h3>
              <pre className="whitespace-pre-wrap text-sm">
                {p.text}
              </pre>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
