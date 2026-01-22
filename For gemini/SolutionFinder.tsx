"use client";

import { useState } from "react";
import { recommendSolution } from "../lib/recommendSolution";
import { Solution } from "../lib/solutionFinderCatalog";
import { useCTA } from "./CTAProvider";

export default function SolutionFinder() {
  const { openMeeting } = useCTA();

  const [challenge, setChallenge] = useState("");
  const [result, setResult] = useState<Solution | null>(null);

  function handleGenerate() {
    if (!challenge.trim()) return;
    const rec = recommendSolution(challenge);
    setResult(rec);
  }

  return (
    <section className="bg-white py-32 border-t border-black/5">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-14">
        {/* Input */}
        <div>
          <div className="text-[10px] font-extrabold tracking-[0.35em] uppercase text-[var(--taag-red)]">
            Solution Finder
          </div>

          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
            One challenge. One recommendation.
          </h2>

           <p className="mt-4 text-sm text-black/80">
            Describe your microbiological challenge. We will identify the most
            appropriate solution based on our products, services and technologies.
            </p>

          <textarea
            value={challenge}
            onChange={(e) => setChallenge(e.target.value)}
            placeholder="e.g. recurring Salmonella positives in environmental samples with long release delays"
            className="mt-8 w-full min-h-[140px] border border-black/10 p-4 text-sm outline-none focus:border-[var(--taag-red)]"
          />

          <button
            onClick={handleGenerate}
            className="mt-6 px-5 py-3 text-xs font-extrabold tracking-widest uppercase bg-[var(--taag-red)] text-white"
          >
            Generate recommendation
          </button>
        </div>

        {/* Output */}
        <div className="bg-[#FAFAFA] p-12">
          {!result && (
            <p className="text-sm text-black/50">
              Enter your challenge to generate a recommendation.
            </p>
          )}

          {result && (
            <>
              <div className="text-[10px] font-extrabold tracking-[0.35em] uppercase text-black/50">
                Recommended TAAG Solution
              </div>

              <h3 className="mt-4 text-2xl font-extrabold tracking-tight">
                {result.name}
              </h3>

              <ul className="mt-6 space-y-2 text-sm text-black/80">
                {result.deliverables.map((d) => (
                  <li key={d}>• {d}</li>
                ))}
              </ul>

              <ul className="mt-6 space-y-2 text-sm text-black/70">
                {result.proof.map((p) => (
                  <li key={p}>— {p}</li>
                ))}
              </ul>

              <a
                href={result.canonicalUrl}
                className="mt-6 inline-block text-sm font-semibold underline underline-offset-4"
              >
                Learn more about this solution
              </a>

              <div className="mt-8">
                <button
                  onClick={openMeeting}
                  className="px-5 py-3 text-xs font-extrabold tracking-widest uppercase bg-[var(--taag-red)] text-white"
                >
                  Book a Meeting
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}