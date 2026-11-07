"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface SidebarContextType {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  toggleExpanded: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ 
  children, 
  defaultExpanded = false 
}: { 
  children: React.ReactNode;
  defaultExpanded?: boolean;
}) {
  const [isExpanded, setIsExpandedState] = useState(defaultExpanded);

  useEffect(() => {
    const savedExpanded = localStorage.getItem("khit_sidebar_expanded");
    if (savedExpanded !== null && document.cookie.indexOf("khit_sidebar_expanded") === -1) {
      document.cookie = `khit_sidebar_expanded=${savedExpanded}; path=/; max-age=31536000; SameSite=Lax`;
    }
  }, []);

  const setIsExpanded = (expanded: boolean) => {
    setIsExpandedState(expanded);
    document.cookie = `khit_sidebar_expanded=${expanded}; path=/; max-age=31536000; SameSite=Lax`;
    localStorage.setItem("khit_sidebar_expanded", String(expanded));
  };

  const toggleExpanded = () => {
    setIsExpandedState((prev) => {
      const next = !prev;
      document.cookie = `khit_sidebar_expanded=${next}; path=/; max-age=31536000; SameSite=Lax`;
      localStorage.setItem("khit_sidebar_expanded", String(next));
      return next;
    });
  };

  return (
    <SidebarContext.Provider
      value={{
        isExpanded,
        setIsExpanded,
        toggleExpanded,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

export function DashboardMain({ children }: { children: React.ReactNode }) {
  const { isExpanded } = useSidebar();

  return (
    <main className={`pb-[64px] md:pb-8 transition-all duration-300 ease-in-out ${isExpanded ? "md:ml-64" : "md:ml-[72px]"}`}>
      <div className="p-4 sm:p-6 md:p-8 w-full max-w-[1700px] mx-auto">
        {children}
      </div>
    </main>
  );
}