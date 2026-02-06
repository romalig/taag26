"use client";

import Image from "next/image";
import { ReactNode } from "react";
import { Cpu } from "lucide-react";

interface ModalBaseProps {
  title: string;
  description?: string;
  image?: string;
  tags?: string[];
  children: ReactNode; // Aquí va el contenido específico de cada modal
}

export default function ModalBaseLayout({ title, description, image, tags, children }: ModalBaseProps) {
  return (
    <>
      {/* COLUMNA IZQUIERDA: VISUAL */}
      <div className="w-full md:w-5/12 bg-[#F5F5F7] relative flex items-center justify-center p-10 md:p-12 min-h-[300px]">
        {image ? (
          <div className="relative w-full h-full min-h-[250px]">
            <Image src={image} alt={title} fill className="object-contain drop-shadow-xl" />
          </div>
        ) : (
          <div className="w-32 h-32 rounded-full border-4 border-gray-200 flex items-center justify-center">
             <Cpu className="w-12 h-12 text-gray-300" />
          </div>
        )}
      </div>

      {/* COLUMNA DERECHA: CONTENIDO */}
      <div className="w-full md:w-7/12 p-8 md:p-14 overflow-y-auto flex flex-col">
        <div className="mb-8">
          {tags && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map(tag => (
                <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-[#FF270A] bg-[#FF270A]/5 px-3 py-1.5 rounded-full border border-[#FF270A]/10">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#111111] leading-tight mb-4 tracking-tight">
            {title}
          </h2>
          {description && (
            <p className="text-lg text-gray-500 font-medium leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* CONTENIDO ESPECÍFICO INYECTADO */}
        {children}
        
      </div>
    </>
  );
}