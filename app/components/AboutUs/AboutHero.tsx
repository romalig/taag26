"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Target, Lightbulb } from "lucide-react";

// ── Animación del paisaje alpino (coordenadas en el sistema 2048 × 768 de la imagen) ──
const SKY_CLIP = "M0 0H2048V307L1987 303 1914 344 1869 328 1848 335 1830 319 1725 368 1686 345 1654 355 1551 325 1505 343 1483 354 1473 350 1450 358 1407 340 1390 324 1376 326 1357 306 1350 307 1345 290 1339 291 1310 244 1290 231 1274 217 1261 227 1253 240 1245 257 1229 269 1212 302 1194 314 1182 331 1165 344 1136 332 1110 321 1088 332 1071 327 1018 343 1006 350 948 341 899 317 856 333 807 350 752 316 702 293 626 326 585 347 569 344 558 354 524 338 491 318 457 332 440 325 380 345 371 343 344 356 296 335 277 342 208 305 174 321 166 318 142 330 106 342 0 306Z";
const LAKE_CLIP = "M530 554L1080 554 1040 575 941 592 840 611 890 622 1176 624 1104 652 978 684 910 662 839 647 784 633 686 650 611 626 490 615 452 599 528 578 579 573Z";

const BIRDS = Array.from({ length: 12 }, (_, i) => ({
  duration: [48, 54, 60][i % 3],
  delay: -(3 + 4.7 * i),
  x: [0, -21, -42][i % 3],
  y: [238, 253, 268, 283][i % 4],
  scale: [0.8, 0.96, 1.12][i % 3],
}));

const CHIMNEYS = [
  [1570, 522],
  [1805, 478],
  [1926, 453],
];
const SMOKE_DELAYS = [-0.7, -2.7, -4.7, -6.7, -8.7];

// [luz?, periodo, offset, x, y, medio ancho]
const WAVES: [boolean, number, number, number, number, number][] = [
  [false, 4.5, -7.0, 500, 557, 6.0],
  [true, 5.2, -0.73, 583, 564, 10.75],
  [true, 5.9, -1.46, 666, 571, 15.5],
  [false, 6.6, -2.19, 749, 578, 20.25],
  [true, 7.3, -2.92, 832, 585, 25.0],
  [true, 4.5, -3.65, 915, 592, 9.25],
  [false, 5.2, -4.38, 998, 599, 14.0],
  [true, 5.9, -5.11, 511, 606, 18.75],
  [true, 6.6, -5.84, 594, 613, 23.5],
  [false, 7.3, -6.57, 677, 620, 7.75],
  [true, 4.5, -0.3, 760, 627, 12.5],
  [true, 5.2, -1.03, 843, 634, 17.25],
  [false, 5.9, -1.76, 926, 641, 22.0],
  [true, 6.6, -2.49, 1009, 648, 6.25],
  [true, 7.3, -3.22, 522, 655, 11.0],
  [false, 4.5, -3.95, 605, 662, 15.75],
  [true, 5.2, -4.68, 688, 557, 20.5],
  [true, 5.9, -5.41, 771, 564, 25.25],
  [false, 6.6, -6.14, 854, 571, 9.5],
  [true, 7.3, -6.87, 937, 578, 14.25],
  [true, 4.5, -0.6, 1020, 585, 19.0],
  [false, 5.2, -1.33, 533, 592, 23.75],
  [true, 5.9, -2.06, 616, 599, 8.0],
  [true, 6.6, -2.79, 699, 606, 12.75],
  [false, 7.3, -3.52, 782, 613, 17.5],
  [true, 4.5, -4.25, 865, 620, 22.25],
  [true, 5.2, -4.98, 948, 627, 6.5],
  [false, 5.9, -5.71, 1031, 634, 11.25],
  [true, 6.6, -6.44, 544, 641, 16.0],
  [true, 7.3, -0.17, 627, 648, 20.75],
  [false, 4.5, -0.9, 710, 655, 25.5],
  [true, 5.2, -1.63, 793, 662, 9.75],
];

const GLIMMERS = [
  { d: "M635 561h91m-120 5h52m22 10h76m-144 10h117m-198 15h89m31 8h121", w: 1.2, two: false },
  { d: "M771 618h61m52 13h126m-87 8h65m-275-42h60m-72-19h40", w: 1, two: true },
];

type CSSVars = CSSProperties & Record<`--${string}`, string>;

export default function AboutHero() {
  const bandRef = useRef<HTMLDivElement>(null);
  const [offscreen, setOffscreen] = useState(false);

  // Pausa las animaciones cuando la banda no está visible
  useEffect(() => {
    const el = bandRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOffscreen(!entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative w-full min-h-[100svh] flex flex-col bg-white overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-gray-50 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none z-0" />

      {/* Texto: ocupa el espacio libre sobre la imagen */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-6 pt-32 pb-10 md:pb-14">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-[#111111] mb-6 md:mb-8 font-sora tracking-tight leading-[1.1]">
          Hi, we’re TAAG.
        </h1>
        <p className="text-lg md:text-2xl text-gray-500 font-medium leading-relaxed max-w-3xl mx-auto">
          We help organizations manage microbiological risk through advanced molecular solutions and intelligent systems.
        </p>
        <p className="mt-8 md:mt-10 text-base md:text-xl font-semibold text-[#111111] font-sora tracking-tight">
          Designed in Switzerland. <span className="text-[#FF270A]">Implemented worldwide.</span>
        </p>
      </div>

      {/* Imagen anclada al borde inferior de la pantalla */}
      <div className="relative w-full shrink-0">
        {/* Banda de imagen: ilustración original + elementos animados */}
        <div
          ref={bandRef}
          className={`alpine relative w-full overflow-hidden aspect-[16/9] sm:aspect-[2/1] md:aspect-[16/5] max-h-[50svh] ${offscreen ? "paused" : ""}`}
        >
          <svg
            viewBox="0 0 2048 768"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 w-full h-full"
            role="img"
            aria-label="Illustrated Swiss Alpine landscape with the Matterhorn, a lake and a village"
          >
            <defs>
              <clipPath id="taag-sky"><path d={SKY_CLIP} /></clipPath>
              <clipPath id="taag-lake"><path d={LAKE_CLIP} /></clipPath>
              <filter id="taag-soft" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="2.4" />
              </filter>
              <radialGradient id="taag-sun">
                <stop stopColor="#ffdf98" stopOpacity=".8" />
                <stop offset=".95" stopColor="#f5d08c" stopOpacity=".65" />
                <stop offset="1" stopColor="#f5d08c" stopOpacity="0" />
              </radialGradient>
            </defs>

            <image href="/swiss-landscape.webp" x="0" y="0" width="2048" height="768" />

            {/* Sol y aves: recortados al cielo, quedan detrás de las montañas */}
            <g clipPath="url(#taag-sky)">
              <circle className="sun" cx="1068" cy="341" r="40" fill="url(#taag-sun)" />
              {BIRDS.map((b, i) => (
                <g
                  key={i}
                  className="bird-flight"
                  style={{ "--duration": `${b.duration}s`, "--delay": `${b.delay}s` } as CSSVars}
                >
                  <g transform={`translate(${b.x} ${b.y}) scale(${b.scale})`}>
                    <path
                      className="wings"
                      d="M-8-3Q-3-5 0 0Q3-5 8-3"
                      fill="none"
                      stroke="#214a60"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </g>
                </g>
              ))}
            </g>

            {/* Humo de las chimeneas */}
            {CHIMNEYS.map(([x, y]) =>
              SMOKE_DELAYS.map((d) => (
                <g key={`${x}-${d}`} transform={`translate(${x} ${y})`}>
                  <path
                    className="smoke"
                    style={{ "--delay": `${d}s` } as CSSVars}
                    d="M0 0C-7-8 7-12 1-20S-5-28 2-35"
                    stroke="#e8e9e3"
                    strokeWidth="8"
                    strokeLinecap="round"
                    fill="none"
                    filter="url(#taag-soft)"
                  />
                </g>
              ))
            )}

            {/* Oleaje del lago */}
            <g className="water-motion" clipPath="url(#taag-lake)" fill="none" strokeLinecap="round">
              {WAVES.map(([light, period, offset, x, y, w], i) => (
                <path
                  key={i}
                  className={`wave ${light ? "wave-light" : "wave-shadow"}`}
                  style={{ "--period": `${period}s`, "--offset": `${offset}s` } as CSSVars}
                  d={`M${x} ${y}q${w} -1.8 ${w * 2} 0t${w * 2} 0`}
                />
              ))}
            </g>
            <g clipPath="url(#taag-lake)" fill="none" stroke="#fff6d8" strokeLinecap="round">
              {GLIMMERS.map((g, i) => (
                <g key={i} className={`glimmer ${g.two ? "two" : ""}`}>
                  <path d={g.d} strokeWidth={g.w} />
                </g>
              ))}
            </g>
          </svg>
        </div>
      </div>

      <style jsx>{`
        .font-sora { font-family: var(--font-sora), sans-serif; }

        .sun {
          animation: sunrise 75s ease-in-out infinite alternate;
          transform-origin: 1068px 341px;
        }
        @keyframes sunrise {
          from { transform: translate(-5px, 12px); opacity: 0.55; }
          to   { transform: translate(15px, -25px); opacity: 0.9; }
        }

        .bird-flight {
          animation: flight var(--duration) linear infinite;
          animation-delay: var(--delay);
        }
        @keyframes flight {
          0%      { transform: translate(-110px, 0); opacity: 0; }
          5%, 90% { opacity: 0.78; }
          100%    { transform: translate(2210px, -14px); opacity: 0; }
        }
        .wings {
          animation: wingbeat 1.6s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        @keyframes wingbeat {
          0%, 100% { transform: scaleY(0.35); }
          50%      { transform: scaleY(1); }
        }

        .smoke {
          animation: smoke 10s ease-out infinite;
          animation-delay: var(--delay);
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
        }
        @keyframes smoke {
          0%   { transform: translate(0, 4px) scale(0.55); opacity: 0; }
          20%  { opacity: 0.48; }
          55%  { opacity: 0.3; }
          100% { transform: translate(27px, -67px) scale(2); opacity: 0; }
        }

        .wave {
          animation: waterflow var(--period) ease-in-out infinite;
          animation-delay: var(--offset);
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
        }
        .wave-shadow { stroke: #246b89; stroke-width: 1.2; }
        .wave-light  { stroke: #fff4cb; stroke-width: 1.6; }
        @keyframes waterflow {
          0%   { transform: translate(-16px, -2px) scaleX(0.85); opacity: 0; }
          25%  { opacity: 0.26; }
          55%  { transform: translate(6px, 2px) scaleX(1.08); opacity: 0.46; }
          85%  { opacity: 0.2; }
          100% { transform: translate(24px, 5px) scaleX(1.2); opacity: 0; }
        }

        .glimmer { animation: glimmer 5s ease-in-out infinite; opacity: 0; }
        .glimmer.two { animation-delay: -5s; }
        @keyframes glimmer {
          0%, 100% { opacity: 0; transform: translateX(-15px); }
          50%      { opacity: 0.42; transform: translateX(15px); }
        }

        .alpine.paused * { animation-play-state: paused !important; }

        @media (prefers-reduced-motion: reduce) {
          .alpine * { animation: none !important; }
          .sun, .bird-flight, .smoke, .glimmer, .water-motion { display: none; }
        }
      `}</style>
    </section>
  );
}
