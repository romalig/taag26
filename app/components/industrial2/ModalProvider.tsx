"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Definimos el tipo de contexto
type ModalContextType = {
  isOpen: boolean;
  modalContent: ReactNode | null; // Aceptamos componentes (archivos TSX)
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const openModal = (content: ReactNode) => {
    setModalContent(content);
    setIsOpen(true);
    document.body.style.overflow = "hidden"; // Bloquear scroll
  };

  const closeModal = () => {
    setIsOpen(false);
    // Esperar a la animación para limpiar
    setTimeout(() => setModalContent(null), 700); 
    document.body.style.overflow = "unset"; 
  };

  return (
    <ModalContext.Provider value={{ isOpen, modalContent, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
}