export default function ProofStrip() {
  return (
    <section className="bg-white border-y border-black/5">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-center text-sm font-semibold text-black/70">
            Powering microbiological decisions for leading global manufacturers
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-8 opacity-60">
          {["LOGO", "LOGO", "LOGO", "LOGO", "LOGO"].map((t, i) => (
            <div
              key={i}
              className="h-8 w-24 border border-black/10 flex items-center justify-center text-xs font-bold"
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}