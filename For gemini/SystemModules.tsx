type Tile = {
  id: string;
  kicker: string;
  titleA: string;
  titleB: string;
  body: string;
  href: string;
  media: "image" | "stack" | "grid";
  imageSrc?: string;
  mediaHeight: "short" | "tall";
};

const TAAG_RED = "var(--taag-red)";

function Media({ t }: { t: Tile }) {
  const h =
    t.mediaHeight === "tall"
      ? "h-[280px] md:h-[320px]"
      : "h-[220px] md:h-[250px]";

  return (
    <div className={`relative ${h}`}>
      {t.media === "image" && t.imageSrc ? (
        <>
          <img
            src={t.imageSrc}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              filter: "grayscale(100%) brightness(0.95) contrast(1.05)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F6F3EE] via-transparent to-transparent" />
        </>
      ) : null}

      {t.media === "stack" ? (
        <div className="absolute inset-0 flex items-end justify-center pb-10">
          <div className="relative w-[320px] h-[180px]">
            <div className="absolute right-2 top-4 w-[230px] h-[150px] rounded-2xl bg-white/70 border border-black/10 rotate-[6deg]" />
            <div className="absolute right-8 top-1 w-[250px] h-[160px] rounded-2xl bg-white/85 border border-black/10 rotate-[-4deg]" />
            <div className="absolute left-2 bottom-0 w-[210px] h-[150px] rounded-2xl bg-white border border-black/10 p-5">
              <div className="text-[10px] font-extrabold tracking-[0.28em] uppercase text-black/50">
                MILA™ output
              </div>
              <div className="mt-3 text-sm font-semibold text-black">
                Assay design package
              </div>
              <div className="mt-3 h-2 w-28 bg-black/10 rounded" />
              <div className="mt-2 h-2 w-40 bg-black/10 rounded" />
              <div className="mt-2 h-2 w-24 bg-black/10 rounded" />
              <div
                className="mt-4 text-[10px] font-extrabold tracking-[0.28em] uppercase"
                style={{ color: TAAG_RED }}
              >
                Verified signatures
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {t.media === "grid" ? (
        <div className="absolute inset-0 flex items-end justify-center pb-10">
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-14 w-14 rounded-2xl bg-white/70 border border-black/10 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.35)]"
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function SystemModules() {
  const tiles: Tile[] = [
    {
      id: "industrial",
      kicker: "Industrial microbiology",
      titleA: "Same-shift",
      titleB: "decisions",
      body:
        "RNA screening and high-multiplex detection to reduce hold time and accelerate release-critical actions.",
      href: "/en/industrial-microbiology",
      media: "image",
      imageSrc:
        "https://images.unsplash.com/photo-1582719471384-894fbb16e024?q=80&w=1600&auto=format&fit=crop",
      mediaHeight: "tall",
    },
    {
      id: "custom",
      kicker: "Customized molecular solutions",
      titleA: "MILA™",
      titleB: "custom assays",
      body:
        "AI-assisted assay design for matrix- and strain-specific detection when standard PCR is not enough.",
      href: "/en/customized-molecular-solutions",
      media: "stack",
      mediaHeight: "short",
    },
    {
      id: "digital",
      kicker: "Digital transformation",
      titleA: "Results to",
      titleB: "action",
      body:
        "Transform microbiological results into preventive programs across sites and recurring events.",
      href: "/en/digital-transformation",
      media: "grid",
      mediaHeight: "short",
    },
    {
      id: "hubs",
      kicker: "Hubs",
      titleA: "Local",
      titleB: "execution",
      body:
        "Advanced testing, NGS traceability, and complex microbiology delivered close to operations.",
      href: "/en/hubs",
      media: "image",
      imageSrc:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1600&auto=format&fit=crop",
      mediaHeight: "tall",
    },
  ];

  return (
    <section className="bg-white py-32 border-t border-black/5">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-[10px] font-extrabold tracking-[0.35em] uppercase text-[var(--taag-red)]">
            The TAAG System
          </div>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-black">
            Modular capabilities, engineered to work together.
          </h2>
          <p className="mt-4 text-sm text-black/80">
            Four complementary approaches that reduce time-to-decision and
            integrate microbiological action across operations.
          </p>
        </div>

        {/* Staggered grid */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {tiles.map((t, i) => (
            <article
              key={t.id}
              className={`
                rounded-3xl border border-black/10 bg-[#F6F3EE] overflow-hidden
                ${i % 2 === 1 ? "lg:mt-16" : ""}
              `}
            >
              <div className="p-10 md:p-12">
                <div className="text-[10px] font-extrabold tracking-[0.35em] uppercase text-black/50">
                  {t.kicker}
                </div>

                <h3 className="mt-6 text-2xl md:text-3xl font-extrabold tracking-tight text-black">
                  {t.titleA}{" "}
                  <span style={{ color: TAAG_RED }}>{t.titleB}</span>
                </h3>

                <p className="mt-4 text-sm text-black/80 max-w-md leading-relaxed">
                  {t.body}
                </p>

                <a
                  href={t.href}
                  className="mt-6 inline-block text-sm font-semibold underline underline-offset-4 hover:no-underline"
                >
                  Learn more
                </a>
              </div>

              <Media t={t} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}