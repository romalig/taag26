"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type SolutionData = {
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  specs?: { label: string; value: string }[];
  longDescription?: string;
};

type ModalContextType = {
  isOpen: boolean;
  activeSolution: SolutionData | null;
  openModal: (data: SolutionData) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSolution, setActiveSolution] = useState<SolutionData | null>(null);

  const openModal = (data: SolutionData) => {
    setActiveSolution(data);
    setIsOpen(true);
    document.body.style.overflow = "hidden"; // Bloquear scroll de fondo
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setActiveSolution(null), 300); // Limpiar datos después de la animación
    document.body.style.overflow = "unset"; // Restaurar scroll
  };

  return (
    <ModalContext.Provider value={{ isOpen, activeSolution, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
}