"use client";

import { useCTA } from "./CTAProvider";

export default function FinalCTA() {
  const { openMeeting } = useCTA();

  return (
    <section
      className="py-24 border-t border-black/5"
      style={{ background: "linear-gradient(to bottom, #FFFFFF 0%, #F3F4F6 100%)" }}
    >
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          Discuss your microbiological decision framework.
         </h3>

        <p className="mt-2 text-sm text-black/80">
        We’ll confirm scope, timelines, and the most effective TAAG approach.
        </p>
        </div>

        <button
          onClick={openMeeting}
          className="px-5 py-3 text-xs font-extrabold tracking-widest uppercase bg-[var(--taag-red)] text-white"
        >
          Book a Meeting
        </button>
      </div>
    </section>
  );
}