"use client";

import { useEffect, useRef } from "react";

export default function TxAHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // --- CONFIGURACIÓN ---
    const redColor = "rgba(220, 38, 38, 1)";
    const networkColors = ["#7e22ce", "#3b82f6", "#0ea5e9"];
    const connectionDistance = 130;
    
    let particles: Particle[] = [];
    let lastSpawnTime = 0;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      isSeed: boolean;
      
      // Control de ciclo de vida
      alpha: number;
      life: number;
      maxLife: number;
      state: "spawning" | "living" | "dying";
      spawnedChildren: boolean;

      constructor(isSeed: boolean, parentX?: number, parentY?: number) {
        this.isSeed = isSeed;
        this.alpha = 0;
        this.state = "spawning";
        this.spawnedChildren = false;

        // VIDA ÚTIL
        this.maxLife = isSeed ? 400 + Math.random() * 200 : 300 + Math.random() * 100;
        this.life = this.maxLife;

        if (isSeed) {
          // FOCO ROJO
          this.x = Math.random() * (width * 0.9) + (width * 0.05);
          this.y = Math.random() * (height * 0.7) + (height * 0.15);
          
          // CAMBIO 1: Tamaño reducido (4px a 6px)
          this.size = Math.random() * 2 + 4; 
          
          this.color = redColor;
          this.vx = (Math.random() - 0.5) * 0.2;
          this.vy = (Math.random() - 0.5) * 0.2;
        } else {
          // RED SECUNDARIA
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * 60 + 20;
          this.x = (parentX || 0) + Math.cos(angle) * distance;
          this.y = (parentY || 0) + Math.sin(angle) * distance;
          this.size = Math.random() * 2 + 1.5;
          this.color = networkColors[Math.floor(Math.random() * networkColors.length)];
          this.vx = Math.cos(angle) * 0.5;
          this.vy = Math.sin(angle) * 0.5;
        }
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Máquina de estados
        if (this.state === "spawning") {
            this.alpha += 0.02;
            if (this.alpha >= 1) {
                this.alpha = 1;
                this.state = "living";
            }
        } else if (this.state === "living") {
            this.life--;
            if (this.life <= 0) this.state = "dying";
        } else if (this.state === "dying") {
            this.alpha -= 0.02;
        }

        // Propagación
        if (this.isSeed && this.state === "living" && !this.spawnedChildren) {
            this.propagate();
            this.spawnedChildren = true;
        }
      }

      propagate() {
        // CAMBIO 4: Límite de puntos secundarios según dispositivo
        const isMobile = width < 768;
        
        // En móvil: entre 4 y 10. En PC: entre 6 y 14.
        const minChildren = 4;
        const maxChildren = isMobile ? 10 : 14; 
        
        const childrenCount = Math.floor(Math.random() * (maxChildren - minChildren + 1)) + minChildren;

        for (let i = 0; i < childrenCount; i++) {
            particles.push(new Particle(false, this.x, this.y));
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        
        if (this.isSeed) {
            ctx.shadowColor = "rgba(220, 38, 38, 0.5)";
            ctx.shadowBlur = 10;
        }
        
        ctx.fill();
        ctx.restore();
      }
    }

    // --- LOOP ---
    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, width, height);

      // CAMBIO 2 y 3: Definir máximo de focos según ancho de pantalla
      const isMobile = width < 768;
      const currentMaxClusters = isMobile ? 2 : 5;

      const seedCount = particles.filter(p => p.isSeed).length;
      
      // Spawn logic
      if (seedCount < currentMaxClusters && (timestamp - lastSpawnTime > 1500 || seedCount === 0)) {
          particles.push(new Particle(true));
          lastSpawnTime = timestamp;
      }

      // Dibujar Conexiones
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          if (particles[a].isSeed && particles[b].isSeed) continue;

          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = 1 - distance / connectionDistance;
            const lineAlpha = Math.min(particles[a].alpha, particles[b].alpha) * opacity * 0.3;
            
            if (lineAlpha > 0.01) {
                ctx.beginPath();
                if (particles[a].isSeed || particles[b].isSeed) {
                    ctx.strokeStyle = `rgba(220, 50, 50, ${lineAlpha})`;
                } else {
                    ctx.strokeStyle = `rgba(100, 116, 180, ${lineAlpha})`;
                }
                ctx.lineWidth = 1;
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
          }
        }
      }

      // Limpieza y Update
      particles = particles.filter(p => !(p.state === "dying" && p.alpha <= 0));

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    };

    animate(0);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#F5F5F7] overflow-hidden pt-20 pb-10 px-4 md:px-6">
      
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-0"
      />

      <div className="relative z-10 max-w-7xl mx-auto text-center pointer-events-none select-none">
        
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-[#111111] mb-12 tracking-tight leading-tight md:leading-[1.1] max-w-6xl mx-auto font-sora">
          Detect contamination. <br className="hidden md:block" />
          <span className="text-gray-400 inline-block">Visualize the propagation.</span>
        </h1>

        <p className="text-lg md:text-2xl text-gray-500 max-w-3xl mx-auto font-medium leading-relaxed px-2 mb-10">
          TxA transforms isolated microbiological results into a connected map of risks, revealing hidden correlation routes across your operations.
        </p>

      </div>

      <style jsx>{`
        .font-sora {
          font-family: var(--font-sora), sans-serif;
        }
      `}</style>
    </section>
  );
}