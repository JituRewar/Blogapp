import { useState } from "react";

export default function AiChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: input },
      { role: "ai", text: "This is a demo AI response 🤖" },
    ]);
    setInput("");
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-4 hidden md:block">
        <h2 className="text-xl font-bold mb-4">🧠 QEconsePta</h2>
        <button className="w-full bg-black text-white py-2 rounded mb-4">
          + New Chat
        </button>
        <div className="text-sm text-gray-600">Current Chat</div>
      </aside>

      {/* Chat Area */}
      <main className="flex-1 flex flex-col">
        <header className="bg-white border-b p-4 font-semibold">
          AI Chatbot
        </header>

        <section className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-xl p-3 rounded ${
                msg.role === "user"
                  ? "ml-auto bg-blue-600 text-white"
                  : "bg-white border"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </section>

        <footer className="p-4 bg-white border-t flex gap-2">
          <input
            className="flex-1 border rounded px-3 py-2"
            placeholder="Ask something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-black text-white px-4 rounded"
          >
            Send
          </button>
        </footer>
      </main>
    </div>
  );
}