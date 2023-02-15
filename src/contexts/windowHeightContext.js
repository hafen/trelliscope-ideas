import React, { createContext, useContext, useState } from 'react';
import { useWindowHeight } from '@react-hook/window-size';

const WindowHeightContext = createContext({
  height: undefined,
});

export const WindowHeightProvider = ({ children }) => {
  const height = useWindowHeight();

  return (
    <WindowHeightContext.Provider value={{ height }}>
      {children}
    </WindowHeightContext.Provider>
  );
};

export const useWindowHeightContext = () => useContext(WindowHeightContext);
