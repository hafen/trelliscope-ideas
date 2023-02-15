import React, { createContext, useContext, useMemo } from 'react';
import metaData from '../metaData';
import { useSortContext } from './sortContext';
import multiColumnSort from 'multi-column-sort';

const getColumnValue = (column, value) => value;

const MetaDataContext = createContext({
  metaData,
  sortedMetaData: [],
});

export const MetaDataProvider = ({ children }) => {
  const { sortVars } = useSortContext();

  const sortedMetaData = useMemo(() => {
    if (sortVars) {
      if (sortVars.length === 0) {
        return metaData;
      }
      return multiColumnSort(
        [...metaData],
        sortVars.map((d) => Object.values(d)),
        getColumnValue
      );
    }
    return [];
  }, [metaData, sortVars]);

  return (
    <MetaDataContext.Provider value={{ metaData, sortedMetaData }}>
      {children}
    </MetaDataContext.Provider>
  );
};

export const useMetaDataContext = () => useContext(MetaDataContext);
