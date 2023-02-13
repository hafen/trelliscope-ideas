import React, { createContext, useContext, useState } from 'react';

const LayoutContext = createContext({
  layout: undefined,
  setLayout: undefined,
});

export const LayoutProvider = ({ children }) => {
  const [layout, setLayout] = useState('grid');

  return (
    <LayoutContext.Provider value={{ layout, setLayout }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = () => useContext(LayoutContext);
