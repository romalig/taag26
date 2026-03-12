"use client";

import { useState, useRef, useCallback } from "react";
import {
  Loader2,
  ArrowRight,
  Sparkles,
  Terminal,
  SearchX,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { parseDifyResponse, looksLikeJson, DifyResponse } from "@/app/types/dify";
import { ProductCard } from "@/app/components/ProductCard";

export default function SolutionFinder() {
  const [challenge, setChallenge] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [rawReply, setRawReply] = useState<string | null>(null);
  const [structuredReply, setStructuredReply] = useState<DifyResponse | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const sessionRef = useRef<string | null>(null);

  const handleGenerate = useCallback(
    async (overrideText?: string) => {
      const text = (overrideText ?? challenge).trim();
      if (!text || isAnalyzing) return;

      setIsAnalyzing(true);
      setRawReply("");
      setStructuredReply(null);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text,
            ...(sessionRef.current ? { session_id: sessionRef.current } : {}),
          }),
        });

        if (!res.ok || !res.body) throw new Error(`Error: ${res.status}`);

        const sid = res.headers.get("x-session-id");
        if (sid) {
          setSessionId(sid);
          sessionRef.current = sid;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let accumulated = "";

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
            accumulated += token;
            setRawReply((prev) => (prev ?? "") + token);
          }
        }

        const structured = parseDifyResponse(accumulated);
        if (structured) {
          setStructuredReply(structured);
          setRawReply(null);
        }
      } catch {
        setStructuredReply({
          action: "error",
          message: "Could not connect to the assistant. Please try again.",
        });
        setRawReply(null);
      } finally {
        setIsAnalyzing(false);
      }
    },
    [challenge, isAnalyzing]
  );

  const hasResult = rawReply !== null || structuredReply !== null;

  return (
    <section
      className="bg-[#F5F5F7] py-24 lg:py-32 relative overflow-hidden"
      id="solution-finder"
    >
      {/* Dot mesh background */}
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-white opacity-80 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-50 opacity-[0.05] blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        {/* HEADER */}
        <div className="mb-16 md:mb-20 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/50 border border-black/5 rounded-full backdrop-blur-md mb-6 shadow-sm">
            <Terminal className="w-3 h-3 text-[#FF270A]" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#111111]">
              AI Diagnostic Tool
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#111111] leading-tight">
            Share your challenge.
            <br />
            <span className="text-gray-400">Discover your solution.</span>
          </h2>
        </div>

        {/* MAIN INTERFACE */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* LEFT: INPUT — centred when no result */}
          <div
            className={`lg:col-span-5 flex flex-col ${
              !hasResult ? "lg:col-start-4" : ""
            }`}
          >
            <div className="group bg-white/80 backdrop-blur-xl border border-white/40 ring-1 ring-black/5 rounded-[2.5rem] p-8 md:p-10 h-full flex flex-col shadow-[0_20px_40px_-15px_rgba(255,39,10,0.12)] hover:shadow-[0_30px_60px_-15px_rgba(255,39,10,0.2)] transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FF270A]" />

              <label className="flex items-center gap-2 text-xs font-bold text-[#111111] uppercase tracking-widest mb-6 font-mono">
                <Sparkles className="w-3 h-3 text-[#FF270A]" />
                Input Parameters
              </label>

              <textarea
                value={challenge}
                onChange={(e) => setChallenge(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleGenerate();
                  }
                }}
                placeholder="e.g. I need to detect Salmonella in cocoa powder in less than 24 hours to avoid shipment delays..."
                className="w-full bg-transparent border-none text-xl md:text-2xl text-[#111111] placeholder:text-gray-300 focus:ring-0 p-0 resize-none flex-grow min-h-[160px] leading-relaxed font-medium"
              />

              <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-between gap-4">
                <div className="hidden md:flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF270A] animate-pulse" />
                  System Active
                </div>

                <button
                  onClick={() => handleGenerate()}
                  disabled={isAnalyzing || !challenge.trim()}
                  className="group/btn relative overflow-hidden flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-[#111111] text-white rounded-full font-bold hover:bg-[#FF270A] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isAnalyzing ? (
                      <>
                        Processing <Loader2 className="w-4 h-4 animate-spin" />
                      </>
                    ) : (
                      <>
                        Analyze Request{" "}
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: RESULT */}
          {hasResult && (
            <div className="lg:col-span-7 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="h-full">
                <div className="bg-gradient-to-br from-white to-[#F0F0F2] rounded-[2.5rem] h-full p-8 md:p-12 flex flex-col relative overflow-hidden border border-white ring-1 ring-black/5 shadow-2xl shadow-[#FF270A]/10">
                  <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] border-[40px] border-white rounded-full opacity-50 blur-xl pointer-events-none" />
                  <div className="absolute bottom-[-10%] left-[-5%] w-[200px] h-[200px] bg-gray-100 rounded-full mix-blend-multiply opacity-50 blur-3xl pointer-events-none" />

                  <div className="relative z-10 flex flex-col h-full gap-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-gray-100 shadow-sm self-start">
                      <Sparkles className="w-3 h-3 text-[#FF270A]" />
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#111111]">
                        AI Response
                      </span>
                      {isAnalyzing && (
                        <Loader2 className="w-3 h-3 animate-spin text-gray-400" />
                      )}
                    </div>

                    {/* Plain text (streaming or unstructured) */}
                    {rawReply !== null && !structuredReply && !looksLikeJson(rawReply) && (
                      <p className="text-lg md:text-xl text-gray-600 leading-relaxed whitespace-pre-wrap border-l-2 border-[#FF270A]/20 pl-6 flex-1">
                        {rawReply}
                        {isAnalyzing && (
                          <span className="inline-block w-0.5 h-5 bg-gray-400 animate-pulse ml-0.5 align-middle" />
                        )}
                      </p>
                    )}

                    {/* JSON streaming — show processing indicator */}
                    {rawReply !== null && !structuredReply && looksLikeJson(rawReply) && isAnalyzing && (
                      <div className="flex-1 flex items-center gap-2 text-gray-400">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">Processing response…</span>
                      </div>
                    )}

                    {/* Stream finished but could not parse */}
                    {rawReply !== null && !structuredReply && looksLikeJson(rawReply) && !isAnalyzing && (
                      <div className="flex flex-col gap-4 flex-1">
                        <div className="flex items-start gap-3 text-red-600 bg-red-50 border border-red-100 rounded-2xl p-4">
                          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                          <p className="text-sm leading-relaxed">
                            Could not process the response. Please try again.
                          </p>
                        </div>
                        <button
                          onClick={() => handleGenerate(challenge)}
                          className="self-start flex items-center gap-1.5 text-sm font-semibold text-[#111111] border border-gray-200 bg-white px-5 py-2 rounded-full hover:border-[#FF270A]/40 hover:text-[#FF270A] transition-colors"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          Retry
                        </button>
                      </div>
                    )}

                    {/* show_products */}
                    {structuredReply?.action === "show_products" && (
                      <div className="flex flex-col gap-4 flex-1">
                        {structuredReply.message && (structuredReply.cards ?? []).length !== 1 && (
                          <p className="text-base text-gray-600 leading-relaxed border-l-2 border-[#FF270A]/20 pl-4">
                            {structuredReply.message}
                          </p>
                        )}
                        {(structuredReply.cards ?? []).length > 0 && (
                          <div className="grid grid-cols-1 gap-3">
                            {(structuredReply.cards ?? []).map((card, idx) => (
                              <ProductCard
                                key={`${card.id || "card"}-${idx}`}
                                card={card}
                                theme="light"
                                description={
                                  (structuredReply.cards ?? []).length === 1
                                    ? structuredReply.message
                                    : undefined
                                }
                              />
                            ))}
                          </div>
                        )}
                        {structuredReply.follow_up && (
                          <p className="text-sm text-gray-400 italic border-l-2 border-gray-200 pl-4">
                            {structuredReply.follow_up}
                          </p>
                        )}
                      </div>
                    )}

                    {/* ask_clarification */}
                    {structuredReply?.action === "ask_clarification" && (
                      <div className="flex flex-col gap-3 flex-1">
                        <p className="text-lg text-gray-600 leading-relaxed border-l-2 border-[#FF270A]/20 pl-6">
                          {structuredReply.message}
                        </p>
                        {structuredReply.follow_up && (
                          <p className="text-sm text-gray-400 italic border-l-2 border-gray-200 pl-6">
                            {structuredReply.follow_up}
                          </p>
                        )}
                      </div>
                    )}

                    {/* no_results */}
                    {structuredReply?.action === "no_results" && (
                      <div className="flex flex-col gap-4 flex-1">
                        <div className="flex items-start gap-3 text-gray-500">
                          <SearchX className="w-5 h-5 shrink-0 mt-0.5 text-gray-400" />
                          <p className="text-base leading-relaxed">
                            {structuredReply.message}
                          </p>
                        </div>
                        <a
                          href="mailto:sales@taag.bio"
                          className="self-start text-sm font-semibold text-white bg-[#111111] px-5 py-2.5 rounded-full hover:bg-[#FF270A] transition-colors"
                        >
                          Contact commercial team
                        </a>
                      </div>
                    )}

                    {/* out_of_scope */}
                    {structuredReply?.action === "out_of_scope" && (
                      <p className="text-lg text-gray-500 leading-relaxed flex-1">
                        {structuredReply.message}
                      </p>
                    )}

                    {/* error */}
                    {structuredReply?.action === "error" && (
                      <div className="flex flex-col gap-4 flex-1">
                        <div className="flex items-start gap-3 text-red-600 bg-red-50 border border-red-100 rounded-2xl p-4">
                          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                          <p className="text-sm leading-relaxed">
                            {structuredReply.message}
                          </p>
                        </div>
                        <button
                          onClick={() => handleGenerate(challenge)}
                          className="self-start flex items-center gap-1.5 text-sm font-semibold text-[#111111] border border-gray-200 bg-white px-5 py-2 rounded-full hover:border-[#FF270A]/40 hover:text-[#FF270A] transition-colors"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          Retry
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
