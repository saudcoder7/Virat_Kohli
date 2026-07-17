"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import type { FormatTab } from "@/data/kohli-data";

interface FormatTabContextType {
  activeTab: FormatTab;
  setActiveTab: (tab: FormatTab) => void;
}

const FormatTabContext = createContext<FormatTabContextType | undefined>(
  undefined
);

export function FormatTabProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTabState] = useState<FormatTab>("odi");

  const setActiveTab = useCallback((tab: FormatTab) => {
    setActiveTabState(tab);
  }, []);

  return (
    <FormatTabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </FormatTabContext.Provider>
  );
}

export function useFormatTab() {
  const context = useContext(FormatTabContext);
  if (!context) {
    throw new Error("useFormatTab must be used within a FormatTabProvider");
  }
  return context;
}
