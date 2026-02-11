"use client";

import { useEffect, useRef } from "react";

export default function TxAHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Variables para el tamaño lógico
    let width = 0;
    let height = 0;

    // --- FUNCIÓN DE REDIMENSIONAMIENTO ROBUSTA ---
    const handleResize = () => {
      // 1. Obtenemos el tamaño visual exacto del contenedor en pantalla
      const rect = canvas.getBoundingClientRect();
      
      // 2. Ajustamos la resolución interna del canvas para que coincida con el visual
      // Esto evita el estiramiento que causa los óvalos.
      canvas.width = rect.width;
      canvas.height = rect.height;

      // 3. Actualizamos las variables que usan las partículas
      width = rect.width;
      height = rect.height;
    };

    // Llamamos a resize al inicio para configurar
    handleResize();

    // --- CONFIGURACIÓN ---
    const redColor = "rgba(220, 38, 38, 1)";
    const networkColors = ["#7e22ce", "#3b82f6", "#0ea5e9"];
    const connectionDistance = 130;
    
    // Declaración correcta de la clase Particle antes de usarla
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

        this.maxLife = isSeed ? 400 + Math.random() * 200 : 300 + Math.random() * 100;
        this.life = this.maxLife;

        if (isSeed) {
          // FOCO ROJO
          this.x = Math.random() * (width * 0.9) + (width * 0.05);
          this.y = Math.random() * (height * 0.7) + (height * 0.15);
          // Tamaño
          this.size = Math.random() * 2 + 4.5; 
          this.color = redColor;
          this.vx = (Math.random() - 0.5) * 0.2;
          this.vy = (Math.random() - 0.5) * 0.2;
        } else {
          // RED
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

      update(particlesArray: Particle[]) {
        this.x += this.vx;
        this.y += this.vy;

        // Rebote corregido
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

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

        if (this.isSeed && this.state === "living" && !this.spawnedChildren) {
            this.propagate(particlesArray);
            this.spawnedChildren = true;
        }
      }

      propagate(particlesArray: Particle[]) {
        const isMobile = width < 768;
        const minChildren = 4;
        const maxChildren = isMobile ? 10 : 14; 
        const childrenCount = Math.floor(Math.random() * (maxChildren - minChildren + 1)) + minChildren;

        for (let i = 0; i < childrenCount; i++) {
            particlesArray.push(new Particle(false, this.x, this.y));
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.beginPath();
        
        // Círculo perfecto
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

    let particles: Particle[] = [];
    let lastSpawnTime = 0;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!ctx || !canvas) return;
      
      // Limpiar usando las dimensiones actuales correctas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isMobile = width < 768;
      const currentMaxClusters = isMobile ? 1 : 3;

      const seedCount = particles.filter(p => p.isSeed).length;
      
      if (seedCount < currentMaxClusters && (timestamp - lastSpawnTime > 1500 || seedCount === 0)) {
          particles.push(new Particle(true));
          lastSpawnTime = timestamp;
      }

      // Dibujar conexiones
      ctx.lineWidth = 1;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) { // Optimizado: b = a + 1
          if (particles[a].isSeed && particles[b].isSeed) continue;

          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distanceSq = dx * dx + dy * dy; // Optimizado: Evitar Math.sqrt donde sea posible

          if (distanceSq < connectionDistance * connectionDistance) {
            const distance = Math.sqrt(distanceSq);
            const opacity = 1 - distance / connectionDistance;
            const lineAlpha = Math.min(particles[a].alpha, particles[b].alpha) * opacity * 0.3;
            
            if (lineAlpha > 0.01) {
                ctx.beginPath();
                if (particles[a].isSeed || particles[b].isSeed) {
                    ctx.strokeStyle = `rgba(220, 50, 50, ${lineAlpha})`;
                } else {
                    ctx.strokeStyle = `rgba(100, 116, 180, ${lineAlpha})`;
                }
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
          }
        }
      }

      // Actualizar y limpiar partículas muertas
      particles = particles.filter(p => !(p.state === "dying" && p.alpha <= 0));

      particles.forEach((particle) => {
        particle.update(particles);
        particle.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Escuchar el evento resize
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId); // Limpieza importante al desmontar
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden pt-20 pb-10 px-4 md:px-6">
      
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-0"
      />

      <div className="relative z-10 max-w-7xl mx-auto text-center pointer-events-none select-none">
        
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-[#111111] mb-12 tracking-tight leading-tight md:leading-[1.1] max-w-6xl mx-auto font-sora">
          Smart microbiology. <br className="hidden md:block" />
          <span className="text-gray-400 inline-block">Prevent the spread.</span>
        </h1>

        <p className="text-lg md:text-2xl text-gray-500 max-w-3xl mx-auto font-medium leading-relaxed px-2 mb-10">
          TxA transforms isolated results to predict risk, revealing hidden correlations before they become outbreaks.
        </p>

      </div>

      {/* PUENTE VISUAL INVISIBLE PARA CONECTAR CON TxASystem.tsx */}
      <div 
        className="absolute bottom-0 left-0 w-full h-40 pointer-events-none z-10" 
        style={{
          background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, #f3f4f6 100%)"
        }}
      />

      <style jsx>{`
        .font-sora {
          font-family: var(--font-sora), sans-serif;
        }
      `}</style>
    </section>
  );
}