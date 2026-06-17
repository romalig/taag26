"use client";

import { useEffect, useRef, useState } from "react";
import type React from "react";
import { X } from "lucide-react";
import { useModal } from "./ModalProvider";

export default function SolutionModal() {
  const { isOpen, modalContent, stackDepth, closeModal, closeAll } = useModal();
  
  const [isRendered, setIsRendered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Crossfade between modal levels
  const [displayedContent, setDisplayedContent] = useState<React.ReactNode>(null);
  const [contentVisible, setContentVisible] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);
  const prevDepthRef = useRef(0);
  const savedScrollRef = useRef<number[]>([]);
  const isInitialContent = useRef(true);

  // When modalContent changes, crossfade: fade-out → swap → fade-in
  useEffect(() => {
    if (modalContent === null) return;
    if (isInitialContent.current) {
      // First open: set immediately, no animation
      setDisplayedContent(modalContent);
      isInitialContent.current = false;
      return;
    }
    // Navigation: fade out, swap, fade in
    setContentVisible(false);
    const swap = setTimeout(() => {
      setDisplayedContent(modalContent);
      setContentVisible(true);
    }, 220);
    return () => clearTimeout(swap);
  }, [modalContent]); // eslint-disable-line react-hooks/exhaustive-deps

  // Reset flag when modal closes so next open is instant again
  useEffect(() => {
    if (!isOpen) isInitialContent.current = true;
  }, [isOpen]);

  // Direction-aware scroll management:
  // push → save current position + reset to top (after fade-out)
  // pop  → restore saved position (after fade-out)
  useEffect(() => {
    const prev = prevDepthRef.current;
    const curr = stackDepth;
    if (curr > prev) {
      savedScrollRef.current.push(scrollRef.current?.scrollTop ?? 0);
      // Delay scroll reset until content has faded out
      const t = setTimeout(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = 0;
      }, 220);
      prevDepthRef.current = curr;
      return () => clearTimeout(t);
    } else if (curr < prev && curr > 0) {
      const saved = savedScrollRef.current.pop() ?? 0;
      // Delay restore until content has faded out
      const t = setTimeout(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = saved;
      }, 220);
      prevDepthRef.current = curr;
      return () => clearTimeout(t);
    } else if (curr === 0) {
      savedScrollRef.current = [];
    }
    prevDepthRef.current = curr;
  }, [stackDepth]);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      const timer = setTimeout(() => setIsAnimating(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => setIsRendered(false), 1000); 
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isRendered) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-center">
      
      {/* BACKDROP */}
      <div 
        className={`
          fixed inset-0 bg-black/40 transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${isAnimating ? 'backdrop-blur-xl opacity-100' : 'backdrop-blur-none opacity-0'}
        `}
        onClick={closeAll} 
      />

      {/* WRAPPER SCROLLEABLE */}
      <div
        ref={scrollRef}
        className="absolute inset-0 overflow-y-auto overflow-x-hidden py-12 md:py-20 flex items-start justify-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        onClick={closeAll}
      >
        
        {/* TARJETA MODAL */}
        <div 
          className={`
            relative 
            w-[95vw] sm:w-[95%] md:w-full max-w-6xl xl:max-w-7xl 
            h-auto
            bg-white rounded-[2.5rem] shadow-2xl
            transform transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)]
            ${isAnimating ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-24 opacity-0 scale-95'}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* BOTÓN CERRAR */}
          <div className="sticky top-6 z-50 flex justify-end items-center h-0 overflow-visible px-6">
            <button 
              onClick={closeModal}
              className="w-10 h-10 rounded-full bg-gray-100/80 hover:bg-gray-200 backdrop-blur-md flex items-center justify-center transition-all active:scale-90 shadow-sm border border-black/5"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* CONTENIDO */}
          <div className={`w-full transition-opacity duration-300 ease-in-out ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
             {displayedContent}
          </div>
          
        </div>
      </div>
    </div>
  );
}
