"use client";

import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function BookMeetingModal({ open, onClose }: Props) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <button
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      {/* Panel */}
      <div className="relative mx-auto mt-24 w-[92%] max-w-xl bg-white border border-black/10 shadow-2xl">
        <div className="p-8 md:p-10">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="text-[10px] font-extrabold tracking-[0.35em] uppercase text-[var(--taag-red)]">
                Book a Meeting
              </div>
              <h3 className="mt-3 text-2xl font-extrabold tracking-tight">
                Tell us what you need.
              </h3>
              <p className="mt-2 text-sm text-black/60">
                We’ll confirm scope, timelines, and the fastest path to a decision.
              </p>
            </div>

            <button
              onClick={onClose}
              className="text-sm font-semibold text-black/50 hover:text-black"
            >
              Close
            </button>
          </div>

          <form className="mt-8 space-y-5">
            <div>
              <label className="block text-[11px] font-semibold text-black/70">
                Name
              </label>
              <input
                className="mt-2 w-full border border-black/10 p-3 text-sm outline-none focus:border-[var(--taag-red)]"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-black/70">
                Email
              </label>
              <input
                type="email"
                className="mt-2 w-full border border-black/10 p-3 text-sm outline-none focus:border-[var(--taag-red)]"
                placeholder="name@company.com"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-black/70">
                Need
              </label>
              <textarea
                className="mt-2 w-full border border-black/10 p-3 text-sm outline-none focus:border-[var(--taag-red)] min-h-[110px]"
                placeholder="Industry, microorganism, time-to-decision, pain point…"
                required
              />
            </div>

            <p className="text-xs text-black/45">
              Final scope and implementation confirmed with TAAG specialists.
            </p>

            <button
              type="submit"
              className="w-full px-5 py-3 text-xs font-extrabold tracking-widest uppercase bg-[var(--taag-red)] text-white"
            >
              Request meeting
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}