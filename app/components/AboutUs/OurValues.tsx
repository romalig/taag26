"use client";

export default function OurValues() {
  const values = [
    {
      title: "Embrace honesty",
      description: "Transparency builds trust. We communicate openly with our clients, partners, and each other. We don't hide behind jargon; we present data and facts exactly as they are. Absolute honesty is the foundation of our scientific rigor."
    },
    {
      title: "Push the boundaries",
      description: "Innovation is in our DNA. We are constantly exploring new technologies and methodologies to solve complex microbiological challenges that others consider impossible. We don't just follow the standard; we invent what comes next."
    },
    {
      title: "Be world-class",
      description: "We are hyper-focused on doing better, and being better, at every single thing we do. We don't settle for 'good enough' when it comes to protecting global food safety and health. If we want to be known for excellence, we must embody it daily."
    },
    {
      title: "Never settle",
      description: "Continuous improvement drives us forward. We believe that no matter how advanced our current solutions are, there is always room to optimize, accelerate, and refine. We challenge the status quo to deliver faster and more accurate results."
    },
    {
      title: "Team over titles",
      description: "Hard work and a collaborative spirit matter more than hierarchy. We don't have room for rockstars; everyone plays a uniquely important role. Our impact is maximized when we roll up our sleeves, support each other, and put the team first."
    },
    {
      title: "Fail forward",
      description: "Operating at the cutting edge of biotechnology means taking risks. We are unafraid to make mistakes, provided we own them, learn from them, and iterate quickly. Every failure is just data that helps us build a stronger, smarter solution."
    }
  ];

  return (
    <section className="w-full bg-white pt-24 md:pt-32 pb-12 md:pb-16 border-t border-gray-100">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* ENCABEZADO */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl font-bold text-[#111111] font-sora tracking-tight">
            Our Values
          </h2>
        </div>

        {/* GRILLA DE VALORES: 3 Columnas en Desktop, 2 en Tablet, 1 en Móvil */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {values.map((value, index) => (
            <div key={index} className="flex flex-col">
              <h3 className="text-[22px] md:text-2xl font-bold text-[#111111] mb-4 font-sora tracking-tight">
                {value.title}
              </h3>
              <p className="text-[15px] md:text-[16px] text-gray-600 font-medium leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        .font-sora { font-family: var(--font-sora), sans-serif; }
      `}</style>
    </section>
  );
}