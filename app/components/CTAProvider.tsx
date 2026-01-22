"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// 1. Definimos los tipos
interface CTAContextType {
  isMeetingOpen: boolean;
  openMeeting: () => void;
  closeMeeting: () => void;
}

// 2. Creamos el contexto
const CTAContext = createContext<CTAContextType | undefined>(undefined);

// 3. EXPORT NOMBRADO (Importante: 'export function', NO 'export default function')
// Esto hace que funcione el import { CTAProvider } del layout.
export function CTAProvider({ children }: { children: ReactNode }) {
  const [isMeetingOpen, setIsMeetingOpen] = useState(false);

  const openMeeting = () => setIsMeetingOpen(true);
  const closeMeeting = () => setIsMeetingOpen(false);

  return (
    <CTAContext.Provider value={{ isMeetingOpen, openMeeting, closeMeeting }}>
      {children}
    </CTAContext.Provider>
  );
}

// 4. Hook personalizado para usar el contexto
export function useCTA() {
  const context = useContext(CTAContext);
  if (context === undefined) {
    throw new Error("useCTA must be used within a CTAProvider");
  }
  return context;
}