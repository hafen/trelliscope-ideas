import React, { createContext, useContext, useState } from 'react';

const SidebarContext = createContext({
  sidebarOpen: undefined,
  setSidebarOpen: undefined,
  sidebarWidth: undefined,
  setSidebarWidth: undefined,
});

export const SidebarProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(400);

  return (
    <SidebarContext.Provider
      value={{ sidebarOpen, setSidebarOpen, sidebarWidth, setSidebarWidth }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);
