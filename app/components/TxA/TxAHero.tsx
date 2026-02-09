"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function TxAHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // --- LÓGICA DE ANIMACIÓN DE RED (CANVAS) ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Colores extraídos del logo TxA (Morados, Azules, Turquesas)
    const colors = ["#7e22ce", "#2dd4bf", "#3b82f6", "#a855f7"];
    
    // Configuración de partículas
    const particleCount = 60; // Cantidad de nodos
    const connectionDistance = 150; // Distancia para conectar líneas
    const mouseDistance = 200; // Radio de interacción del mouse

    let particles: Particle[] = [];
    
    // Posición del mouse
    const mouse = { x: -1000, y: -1000 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5; // Velocidad lenta X
        this.vy = (Math.random() - 0.5) * 0.5; // Velocidad lenta Y
        this.size = Math.random() * 2 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Rebote en bordes
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Interacción con mouse (repulsión suave)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseDistance) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouseDistance - distance) / mouseDistance;
          const directionX = forceDirectionX * force * 0.5; // Fuerza
          const directionY = forceDirectionY * force * 0.5;

          this.x -= directionX;
          this.y -= directionY;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Inicializar
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Loop de animación
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Dibujar líneas de conexión
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = 1 - distance / connectionDistance;
            ctx.strokeStyle = `rgba(100, 116, 139, ${opacity * 0.15})`; // Color línea gris azulada suave
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }

      // Actualizar y dibujar partículas
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Event Listeners
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Ajuste para coordenadas relativas si el canvas no ocupa toda la pantalla, 
      // pero como es Hero, usamos clientX/Y
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center bg-[#F5F5F7] overflow-hidden">
      
      {/* 1. FONDO ANIMADO (CANVAS) */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-auto z-0"
      />

      {/* 2. CONTENIDO PRINCIPAL */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-10">
        
        {/* LOGO FLOTANTE CON EFECTO GLASS */}
        <div className="inline-block mb-10 animate-float-slow">
            <div className="relative w-28 h-28 md:w-36 md:h-36 bg-white/40 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/50 flex items-center justify-center p-2 group">
                {/* Glow trasero sutil */}
                <div className="absolute inset-4 bg-purple-500/30 blur-2xl rounded-full -z-10 group-hover:bg-cyan-400/30 transition-colors duration-700"></div>
                
                {/* Imagen del Logo */}
                <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden shadow-inner">
                    <Image 
                        src="/LogoTxANB.png" 
                        alt="TxA Logo" 
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </div>

        {/* HEADLINE */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-[#111111] tracking-tight mb-6 font-sora leading-[1.1]">
          Turn data into <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400 animate-gradient-x">
            decision power.
          </span>
        </h1>

        {/* SUBHEAD */}
        <p className="text-lg md:text-2xl text-gray-500 font-medium max-w-3xl mx-auto mb-10 leading-relaxed">
          TAAG’s digital platform connects testing, sampling, and analytics in one intelligent system. 
          Faster responses. Better control. Smarter decisions.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-[#111111] text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-purple-900/20">
                Request Demo
                <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-white text-[#111111] border border-gray-200 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-colors">
                Explore Features
            </button>
        </div>

      </div>

      {/* ESTILOS JSX & KEYFRAMES */}
      <style jsx>{`
        .font-sora {
          font-family: var(--font-sora), sans-serif;
        }

        @keyframes float-slow {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
        }
        .animate-float-slow {
            animation: float-slow 6s ease-in-out infinite;
        }

        @keyframes gradient-x {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 5s ease infinite;
        }
      `}</style>
    </section>
  );
}