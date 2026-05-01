"use client";

import { usePathname } from "next/navigation";
import enMessages from "@/messages/en.json";
import esMessages from "@/messages/es.json";

export default function GlobalError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname();
  const isEs = pathname?.startsWith("/es") ?? false;
  const copy = (isEs ? esMessages : enMessages).GlobalError;

  return (
    <html lang={isEs ? "es" : "en"}>
      <body>
        <main className="min-h-screen bg-white px-6 py-24 text-[#111111]">
          <div className="mx-auto max-w-xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#FF270A]">TAAG</p>
            <h1 className="mt-4 text-3xl font-bold">{copy.title}</h1>
            <p className="mt-4 text-sm leading-6 text-black/60">{copy.description}</p>
            <button
              type="button"
              onClick={reset}
              className="mt-8 rounded-full bg-[#111111] px-5 py-3 text-sm font-bold text-white"
            >
              {copy.retry}
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
