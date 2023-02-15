import React, { createContext, useContext, useState } from 'react';

const LabelContext = createContext({
  labelVars: undefined,
  setLabelVars: undefined,
});

export const LabelProvider = ({ children }) => {
  const [labelVars, setLabelVars] = useState(['continent', 'country']);

  return (
    <LabelContext.Provider value={{ labelVars, setLabelVars }}>
      {children}
    </LabelContext.Provider>
  );
};

export const useLabelContext = () => useContext(LabelContext);

// https://betterprogramming.pub/easy-state-management-with-react-hooks-and-the-context-api-5db04e1f0ba5
