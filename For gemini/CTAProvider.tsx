"use client";

import { createContext, useContext, useMemo, useState } from "react";
import BookMeetingModal from "./BookMeetingModal";

type Ctx = {
  openMeeting: () => void;
};

const CTAContext = createContext<Ctx | null>(null);

export function useCTA() {
  const ctx = useContext(CTAContext);
  if (!ctx) throw new Error("useCTA must be used within CTAProvider");
  return ctx;
}

export default function CTAProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const value = useMemo(
    () => ({
      openMeeting: () => setOpen(true),
    }),
    []
  );

  return (
    <CTAContext.Provider value={value}>
      {children}
      <BookMeetingModal open={open} onClose={() => setOpen(false)} />
    </CTAContext.Provider>
  );
}