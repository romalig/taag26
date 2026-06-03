"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ModalContextType = {
  isOpen: boolean;
  canGoBack: boolean;
  stackDepth: number;
  modalContent: ReactNode | null;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  closeAll: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [stack, setStack] = useState<ReactNode[]>([]);

  const isOpen = stack.length > 0;
  const canGoBack = stack.length > 1;
  const modalContent = stack.length > 0 ? stack[stack.length - 1] : null;

  const openModal = (content: ReactNode) => {
    setStack((prev) => [...prev, content]);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setStack((prev) => {
      const next = prev.slice(0, -1);
      if (next.length === 0) document.body.style.overflow = "unset";
      return next;
    });
  };

  const closeAll = () => {
    setStack([]);
    document.body.style.overflow = "unset";
  };

  return (
    <ModalContext.Provider value={{ isOpen, canGoBack, stackDepth: stack.length, modalContent, openModal, closeModal, closeAll }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
}