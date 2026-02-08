import React, { useState } from "react";

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

      if (!res.ok) throw new Error("Server error");

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
    <div className="min-h-screen bg-[#fff5f8] relative overflow-hidden font-sans text-slate-700">
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-blue-200/40 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-pink-200/40 rounded-full blur-[100px] animate-pulse transition-all duration-1000"></div>

      <header className="relative z-10 py-10 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white shadow-sm rounded-2xl">
              <svg className="w-8 h-8 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5zm4 4h-2v-2h2v2zm0-4h-2V7h2v5z"/>
              </svg>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-800">
              PDF <span className="text-[#3498db]">Vault.</span>
            </h1>
          </div>
          <div className="hidden md:block text-xs font-bold uppercase tracking-widest text-pink-400 bg-pink-50 px-4 py-2 rounded-full border border-pink-100">
            AI-Powered Extraction
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-white/70 backdrop-blur-xl border-2 border-dashed border-blue-200 rounded-[2.5rem] p-8 md:p-12 mb-12 shadow-xl shadow-blue-100/50 transition-all hover:border-[#3498db]/50">
          <form onSubmit={handleSubmit} className="flex flex-col items-center text-center gap-6">
            <div className="w-20 h-20 bg-linear-to-tr from-pink-50 to-blue-50 rounded-full flex items-center justify-center animate-bounce duration-3000">
                <svg className="w-10 h-10 text-[#3498db]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
            </div>
            
            <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-800">Bring your documents to life</h2>
                <p className="text-slate-500 max-w-sm mx-auto">Upload any PDF to extract structured text instantly for your knowledge base.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg mt-4">
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
                required
                className="flex-1 px-4 py-4 rounded-2xl bg-white border border-slate-200 text-sm focus:ring-2 focus:ring-blue-100 transition-all file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-[#3498db] cursor-pointer"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-4 rounded-2xl bg-[#3498db] hover:bg-[#2980b9] text-white font-bold shadow-lg shadow-blue-200 transition-all hover:-translate-y-1 active:scale-95 disabled:bg-slate-300"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Reading...</span>
                  </div>
                ) : "Analyze PDF"}
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          {pages.length === 0 && !loading && (
            <div className="text-center py-20 animate-in fade-in zoom-in duration-1000">
                <div className="text-8xl mb-6 grayscale opacity-20">📂</div>
                <h3 className="text-slate-400 font-medium">No pages extracted yet.</h3>
            </div>
          )}

          {pages.map((p, index) => (
            <div
              key={p.page}
              className="group bg-white border border-slate-100 rounded-4xl p-8 shadow-sm hover:shadow-xl hover:shadow-pink-100/50 transition-all duration-500 animate-in slide-in-from-bottom-8"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center font-bold">
                        {p.page}
                    </span>
                    <h3 className="text-lg font-bold text-slate-800">Page Content</h3>
                </div>
                <button className="text-xs font-bold text-[#3498db] hover:underline uppercase tracking-widest">Copy Text</button>
              </div>
              <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-50">
                <pre className="whitespace-pre-wrap text-sm text-slate-600 leading-relaxed font-mono">
                    {p.text}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}