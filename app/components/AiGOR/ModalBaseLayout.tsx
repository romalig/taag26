"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { ReactNode, useEffect } from "react";

interface ModalBaseLayoutProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalBaseLayout({
  children,
  isOpen,
  onClose,
}: ModalBaseLayoutProps) {
  const t = useTranslations("Common");

  // Bloquear el scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* OVERLAY (Fondo oscuro) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* MODAL CONTAINER */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              // CAMBIO AQUÍ: Se eliminó 'bg-white' para permitir que el contenido defina el fondo (oscuro en Elevia)
              // 'rounded-2xl overflow-hidden' se encargarán de recortar el contenido oscuro con puntas redondas.
              className="relative w-full max-w-4xl shadow-2xl rounded-2xl overflow-hidden flex flex-col max-h-[90vh] pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* BOTÓN DE CIERRE FLOTANTE */}
              <div className="absolute top-4 right-4 z-50">
                <button
                  onClick={onClose}
                  className="w-10 h-10 bg-black/10 hover:bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center transition-colors duration-200 group"
                  aria-label={t("closeModal")}
                >
                  <X className="w-5 h-5 text-gray-700/70 group-hover:text-gray-900 transition-colors" />
                </button>
              </div>

              {/* ÁREA DE CONTENIDO SCROLLABLE */}
              <div className="flex-1 overflow-y-auto overscroll-contain">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
