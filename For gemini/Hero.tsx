export default function Hero() {
  const heroImg =
    "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=2070&auto=format&fit=crop";

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-32 grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <div className="text-[10px] font-extrabold tracking-[0.35em] uppercase text-[#FF270A]">
            Industrial Precision
          </div>

          <h1 className="text-black text-4xl md:text-5xl font-extrabold tracking-tight">
            Industrial microbiology,
            <br />
            engineered for decisions.
          </h1>

            <p className="mt-4 text-sm md:text-base text-black/80 max-w-xl">
            TAAG designs molecular and digital systems that reduce time-to-decision,
            increase microbiological confidence, and support release, hold, and corrective
            actions across industrial environments.
            </p>

            <p className="mt-4 text-xs text-black/45">
            Trusted by global food, beverage, and ingredient manufacturers.
            </p>

        </div>

        <div className="relative h-[420px] lg:h-[520px] overflow-hidden">
          <img
            src={heroImg}
            alt="Laboratory"
            className="w-full h-full object-cover grayscale brightness-[0.55] contrast-110"
            style={{ filter: "grayscale(100%) brightness(0.88) contrast(1.1)" }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/30 to-transparent"
            style={{
              background:
                "linear-gradient(to right, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.55) 35%, rgba(255,255,255,0.0) 70%)",
            }}
          />
          <div className="absolute inset-0 border border-black/10" />
        </div>
      </div>
    </section>
  );
}