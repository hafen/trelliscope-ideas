import React, { createContext, useContext, useState } from 'react';

const SortContext = createContext({
  sortVars: undefined,
  setSortVars: undefined,
});

export const SortProvider = ({ children }) => {
  const [sortVars, setSortVars] = useState([
    { name: 'continent', dir: 'ASC' },
    // { name: 'country', dir: 'ASC' },
    { name: 'mean_gdp', dir: 'ASC' },
  ]);

  return (
    <SortContext.Provider value={{ sortVars, setSortVars }}>
      {children}
    </SortContext.Provider>
  );
};

export const useSortContext = () => useContext(SortContext);

// https://betterprogramming.pub/easy-state-management-with-react-hooks-and-the-context-api-5db04e1f0ba5
