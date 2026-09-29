"use client";

import { useEffect, useRef } from "react";
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

// Sol: sale desde detrás de la cordillera y queda completo sobre ella
const SUN = { cx: 1068, r: 40, fromY: 392, toY: 270, rise: 9 };

// ── Utilidades de animación ──
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (t: number) => t * t * (3 - 2 * t); // ease-in-out
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const mod1 = (v: number) => ((v % 1) + 1) % 1;
/** Interpola una lista de keyframes [posición 0-1, valor] con suavizado entre cada par */
function kf(frames: [number, number][], p: number) {
  for (let i = 1; i < frames.length; i++) {
    const [p0, v0] = frames[i - 1];
    const [p1, v1] = frames[i];
    if (p <= p1) return v0 + (v1 - v0) * smooth(clamp01((p - p0) / (p1 - p0)));
  }
  return frames[frames.length - 1][1];
}

export default function AboutHero() {
  const bandRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  /*
   * Las animaciones se calculan en JS y se escriben como atributos SVG (transform / opacity).
   * No depende de transformaciones CSS sobre SVG, que en Safari iOS reciente fallan
   * dentro de grupos con clip-path. Funciona igual en Safari, Chrome, Firefox y Android.
   */
  useEffect(() => {
    const svg = svgRef.current;
    const band = bandRef.current;
    if (!svg || !band) return;

    const q = <T extends Element>(sel: string) => Array.from(svg.querySelectorAll<T>(sel));
    const sun = svg.querySelector<SVGGElement>("[data-sun]");
    const birds = q<SVGGElement>("[data-bird]");
    const wings = q<SVGPathElement>("[data-wing]");
    const smokes = q<SVGPathElement>("[data-smoke]");
    const waves = q<SVGPathElement>("[data-wave]");
    const glimmers = q<SVGGElement>("[data-glimmer]");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();

    const render = (now: number) => {
      const t = (now - start) / 1000;

      // Sol
      if (sun) {
        const p = easeOut(clamp01(t / SUN.rise));
        const y = SUN.fromY + (SUN.toY - SUN.fromY) * p;
        sun.setAttribute("transform", `translate(${SUN.cx} ${y})`);
      }

      // Aves
      birds.forEach((el, i) => {
        const b = BIRDS[i];
        const p = mod1((t - b.delay) / b.duration);
        const x = -110 + 2320 * p;
        const y = -14 * p;
        el.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
        el.setAttribute("opacity", kf([[0, 0], [0.05, 0.78], [0.9, 0.78], [1, 0]], p).toFixed(3));
      });
      wings.forEach((el, i) => {
        const p = mod1(t / 1.6 + i * 0.13);
        const sy = 0.35 + 0.65 * (0.5 - 0.5 * Math.cos(p * Math.PI * 2));
        el.setAttribute("transform", `scale(1 ${sy.toFixed(3)})`);
      });

      // Humo (ciclo de 10 s, sube, se expande y se desvanece)
      smokes.forEach((el) => {
        const p = mod1((t - Number(el.dataset.delay)) / 10);
        const e = easeOut(p);
        const tx = 27 * e;
        const ty = 4 - 71 * e;
        const sc = 0.55 + 1.45 * e;
        el.setAttribute(
          "transform",
          `translate(${(tx + 0.5).toFixed(2)} ${(ty - 17.5).toFixed(2)}) scale(${sc.toFixed(3)}) translate(-0.5 17.5)`
        );
        el.setAttribute("opacity", kf([[0, 0], [0.2, 0.48], [0.55, 0.3], [1, 0]], p).toFixed(3));
      });

      // Oleaje
      waves.forEach((el, i) => {
        const [, period, offset, x, y, w] = WAVES[i];
        const p = mod1((t - offset) / period);
        const tx = kf([[0, -16], [0.55, 6], [1, 24]], p);
        const ty = kf([[0, -2], [0.55, 2], [1, 5]], p);
        const sx = kf([[0, 0.85], [0.55, 1.08], [1, 1.2]], p);
        const cx = x + 2 * w;
        el.setAttribute(
          "transform",
          `translate(${(tx + cx).toFixed(2)} ${(ty + y).toFixed(2)}) scale(${sx.toFixed(3)} 1) translate(${-cx} ${-y})`
        );
        el.setAttribute("opacity", kf([[0, 0], [0.25, 0.26], [0.55, 0.46], [0.85, 0.2], [1, 0]], p).toFixed(3));
      });

      // Destellos
      glimmers.forEach((el, i) => {
        const p = mod1(t / 10 + i * 0.5);
        const c = Math.cos(p * Math.PI * 2);
        el.setAttribute("transform", `translate(${(-15 * c).toFixed(2)} 0)`);
        el.setAttribute("opacity", (0.21 - 0.21 * c).toFixed(3));
      });
    };

    // Movimiento reducido: un solo cuadro estático con el sol ya arriba
    if (reduced) {
      render(start + SUN.rise * 1000 + 12000);
      return;
    }

    let raf = 0;
    let visible = true;
    const loop = (now: number) => {
      render(now);
      raf = requestAnimationFrame(loop);
    };
    const play = () => {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    // Pausa si la banda sale de pantalla o la pestaña se oculta
    const io =
      "IntersectionObserver" in window
        ? new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible) play();
            else stop();
          })
        : null;
    io?.observe(band);
    const onVisibility = () => (document.hidden ? stop() : play());
    document.addEventListener("visibilitychange", onVisibility);

    render(start);
    play();

    return () => {
      stop();
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
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
      <div
        ref={bandRef}
        className="relative w-full shrink-0 overflow-hidden aspect-[16/9] sm:aspect-[2/1] md:aspect-[16/5] max-h-[50svh]"
      >
        <svg
          ref={svgRef}
          viewBox="0 0 2048 768"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full"
          role="img"
          aria-label="Illustrated Swiss Alpine landscape with the Matterhorn, a lake and a village"
        >
          <defs>
            <clipPath id="taag-sky"><path d={SKY_CLIP} /></clipPath>
            <clipPath id="taag-lake"><path d={LAKE_CLIP} /></clipPath>
            <filter id="taag-soft" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.4" />
            </filter>
            <radialGradient id="taag-sun">
              <stop stopColor="#ffdf98" stopOpacity=".85" />
              <stop offset=".95" stopColor="#f5d08c" stopOpacity=".75" />
              <stop offset="1" stopColor="#f5d08c" stopOpacity="0" />
            </radialGradient>
          </defs>

          <image href="/swiss-landscape.webp" x="0" y="0" width="2048" height="768" />

          {/* Sol y aves: recortados al cielo, pasan detrás de las montañas */}
          <g clipPath="url(#taag-sky)">
            <g data-sun transform={`translate(${SUN.cx} ${SUN.fromY})`}>
              <circle r={SUN.r} fill="url(#taag-sun)" />
            </g>
            {BIRDS.map((b, i) => (
              <g key={i} data-bird opacity="0">
                <g transform={`translate(${b.x} ${b.y}) scale(${b.scale})`}>
                  <path
                    data-wing
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

          {/* Humo: un solo filtro por chimenea (más liviano en móviles) */}
          {CHIMNEYS.map(([x, y]) => (
            <g key={x} transform={`translate(${x} ${y})`} filter="url(#taag-soft)">
              {SMOKE_DELAYS.map((d) => (
                <path
                  key={d}
                  data-smoke
                  data-delay={d}
                  opacity="0"
                  d="M0 0C-7-8 7-12 1-20S-5-28 2-35"
                  stroke="#e8e9e3"
                  strokeWidth="8"
                  strokeLinecap="round"
                  fill="none"
                />
              ))}
            </g>
          ))}

          {/* Oleaje y destellos del lago */}
          <g clipPath="url(#taag-lake)" fill="none" strokeLinecap="round">
            {WAVES.map(([light, , , x, y, w], i) => (
              <path
                key={i}
                data-wave
                opacity="0"
                stroke={light ? "#fff4cb" : "#246b89"}
                strokeWidth={light ? 1.6 : 1.2}
                d={`M${x} ${y}q${w} -1.8 ${w * 2} 0t${w * 2} 0`}
              />
            ))}
            {GLIMMERS.map((g, i) => (
              <g key={i} data-glimmer opacity="0" stroke="#fff6d8">
                <path d={g.d} strokeWidth={g.w} />
              </g>
            ))}
          </g>
        </svg>
      </div>

      <style jsx>{`
        .font-sora { font-family: var(--font-sora), sans-serif; }
      `}</style>
    </section>
  );
}
