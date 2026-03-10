"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Sparkles, MoreHorizontal, Send } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_PROMPTS = [
  "Any emerging trends in zone B?",
  "Summarize last week's results",
  "Identify high-risk sampling points",
];

export default function TxAConversational() {
  const [isLineVisible, setIsLineVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsLineVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(async (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text || isStreaming) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setIsStreaming(true);
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          ...(sessionId ? { session_id: sessionId } : {}),
        }),
      });

      if (!res.ok || !res.body) throw new Error(`Request failed: ${res.status}`);

      const sid = res.headers.get("x-session-id");
      if (sid) setSessionId(sid);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const token = line.slice(6);
          if (token === "</stream>") continue;
          setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = {
              ...copy[copy.length - 1],
              content: copy[copy.length - 1].content + token,
            };
            return copy;
          });
        }
      }
    } catch {
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: "assistant",
          content: "Error connecting to the assistant. Please try again.",
        };
        return copy;
      });
    } finally {
      setIsStreaming(false);
    }
  }, [input, isStreaming, sessionId]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <section className="bg-[#f5f5f7] py-24 md:py-32 overflow-hidden relative" ref={sectionRef}>
      
      {/* ========================================================= */}
      {/* ANIMACIÓN APPLE: LÍNEA DE LUZ HORIZONTAL EXPANSIVA        */}
      {/* ========================================================= */}
      {isLineVisible && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[20px] pointer-events-none z-50">
            {/* Glow difuminado amplio */}
            <div className="absolute top-[-10px] left-0 w-full h-[30px] bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-400 blur-[20px] opacity-0 animate-line-glow origin-center" />
            {/* Línea central más brillante y concentrada */}
            <div className="absolute top-[-2px] left-0 w-full h-[4px] bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-400 blur-[4px] opacity-0 animate-line-glow origin-center" />
        </div>
      )}

      <div className="max-w-[1280px] mx-auto px-6 md:px-10 mb-16 text-center flex flex-col items-center relative z-10 pt-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] mb-6 font-sora tracking-tight leading-[1.1] md:leading-tight">
          Meet your new <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-400">Microbiology Expert.</span>
        </h2>
        <p className="text-[17px] md:text-xl text-gray-500 font-medium leading-relaxed max-w-3xl">
          Stop digging through complex spreadsheets. Talk to your food safety data in plain language. TxA instantly identifies trends, anomalies, and emerging risks, giving you actionable insights in seconds.
        </p>
      </div>

      <div className="w-full flex justify-center px-4 md:px-6 relative z-10">
        <div
          className="w-full max-w-[900px] rounded-[2.5rem] overflow-hidden relative bg-gradient-to-br from-indigo-600 to-blue-500 shadow-2xl shadow-indigo-600/20 flex flex-col"
          style={{ minHeight: 520 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-shine pointer-events-none z-0" />

          {/* Top bar */}
          <div className="relative z-10 px-6 py-4 flex items-center gap-3 border-b border-white/10 shrink-0">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg">
              <Sparkles className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-none">TxA</p>
              <p className="text-white/60 text-xs mt-0.5">Microbiology AI Assistant</p>
            </div>
            {isStreaming && (
              <div className="ml-auto flex items-center gap-1.5">
                <span className="text-white/60 text-xs">Thinking</span>
                <MoreHorizontal className="w-4 h-4 text-white/60 animate-pulse" />
              </div>
            )}
          </div>

          {/* Messages */}
          <div className="relative z-10 flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-3 min-h-[340px] max-h-[400px] md:max-h-[420px]">
            {messages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-6">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Ask TxA anything</p>
                  <p className="text-white/60 text-sm">Trends, anomalies, sampling schemes, risk reports&hellip;</p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center mt-2">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className="text-xs bg-white/10 border border-white/20 text-white px-3 py-1.5 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0 mt-1 shadow-lg">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-white/15 backdrop-blur-md text-white border border-white/20 rounded-tr-sm"
                        : "bg-white text-slate-800 shadow-xl rounded-tl-sm"
                    }`}
                  >
                    {msg.content === "" && isStreaming && i === messages.length - 1 ? (
                      <MoreHorizontal className="w-5 h-5 text-slate-400 animate-pulse" />
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="relative z-10 px-4 pb-5 pt-3 border-t border-white/10 shrink-0">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isStreaming}
                placeholder="Ask about your food safety data…"
                className="flex-1 bg-transparent text-white placeholder:text-white/40 text-sm outline-none disabled:opacity-50"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isStreaming}
                className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shrink-0 hover:bg-white/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="w-3.5 h-3.5 text-indigo-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .font-sora { font-family: var(--font-sora), sans-serif; }

        @keyframes expandLine {
          0% { transform: scaleX(0.01); }
          100% { transform: scaleX(1.1); }
        }
        @keyframes fadeLine {
          0% { opacity: 0; }
          10% { opacity: 1; }
          70% { opacity: 0.8; }
          100% { opacity: 0; }
        }
        .animate-line-glow {
          animation:
            expandLine 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards,
            fadeLine 1.5s linear forwards;
        }
        @keyframes shine {
          from { transform: translateX(-100%) skewX(12deg); }
          to { transform: translateX(200%) skewX(12deg); }
        }
        .animate-shine {
          animation: shine 8s infinite linear;
        }
      `}</style>
    </section>
  );
}