"use client";

import { useEffect, useRef, useState } from "react";
import {
  Dna,
  Layers,
  BrainCircuit,
  Cpu,
  Activity,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

type TimelineJson = {
  titleLine1: string;
  titleAccent: string;
  intro: string;
  innovationBadge: string;
  items: Array<{ title: string; description: string }>;
  future: { badge: string; title: string; body: string };
};

const ICONS: LucideIcon[] = [Dna, Layers, BrainCircuit, Cpu, Activity];

export default function InnovationsTimeline() {
  const t = useTranslations("Pages.About");
  const timeline = t.raw("timeline") as TimelineJson;
  const [isFutureVisible, setIsFutureVisible] = useState(false);
  const futureCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFutureVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (futureCardRef.current) {
      observer.observe(futureCardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full bg-white py-24 md:py-32 border-t border-gray-100 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-[#111111] mb-6 font-sora tracking-tight leading-tight">
            {timeline.titleLine1}
            <br />
            <span className="text-[#FF270A]">{timeline.titleAccent}</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed">{timeline.intro}</p>
        </div>

        <div className="relative w-full">
          <div className="absolute top-0 bottom-0 left-[20px] md:left-1/2 w-[2px] bg-gray-200 transform md:-translate-x-1/2 z-0" />

          <div className="space-y-12 md:space-y-24 relative z-10">
            {timeline.items.map((item, index) => {
              const isLeft = index % 2 === 0;
              const Icon = ICONS[index] ?? Dna;
              return (
                <div key={index} className="relative flex flex-col md:flex-row items-center w-full z-10">
                  <div className="absolute left-[20px] md:left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center shadow-sm z-20 mt-4 md:mt-0 top-0 md:top-auto">
                    <Icon className="w-5 h-5 text-[#FF270A]" />
                  </div>

                  <div className={`w-full md:w-1/2 pl-[70px] md:pl-0 ${isLeft ? "md:pr-16" : "md:pl-16 md:ml-auto"}`}>
                    <div className="bg-[#F4F4F5] rounded-[2rem] p-8 group">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">
                        {timeline.innovationBadge} {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-xl font-bold text-[#111111] mb-3 font-sora tracking-tight">{item.title}</h3>
                      <p className="text-[15px] text-gray-600 font-medium leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="relative flex flex-col md:flex-row items-center w-full z-10 pt-8 md:pt-12">
              <div className="absolute left-[20px] md:left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-[#111111] flex items-center justify-center z-20 mt-4 md:mt-0 top-0 md:top-auto">
                <Sparkles className="w-5 h-5 text-[#FF270A]" />
              </div>

              <div className="w-full md:w-1/2 pl-[70px] md:pl-16 md:ml-auto">
                <div className="relative w-full" ref={futureCardRef}>
                  <div
                    className={`absolute -inset-2.5 rounded-[2.5rem] bg-gradient-to-r from-[#FF270A] via-[#8B5CF6] to-[#00C7FD] blur-xl md:blur-2xl z-0 transition-all duration-1000 ease-out
                   ${isFutureVisible ? "opacity-50 md:opacity-60 scale-100 tech-bg-animate delay-500" : "opacity-0 scale-95"}`}
                  />
                  <div className="relative bg-[#F4F4F5] rounded-[2rem] p-8 md:p-10 z-10 hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold text-[#FF270A] uppercase tracking-widest">
                        {timeline.future.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-[#111111] mb-4 font-sora tracking-tight">{timeline.future.title}</h3>

                    <p className="text-[15px] md:text-base text-gray-600 font-medium leading-relaxed">{timeline.future.body}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .font-sora {
          font-family: var(--font-sora), sans-serif;
        }

        @keyframes shiftGradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes breatheGlow {
          0%,
          100% {
            transform: scale(1);
            filter: blur(24px);
          }
          50% {
            transform: scale(1.02);
            filter: blur(28px);
          }
        }

        .tech-bg-animate {
          background-size: 200% 200%;
          animation:
            shiftGradient 6s ease infinite,
            breatheGlow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
