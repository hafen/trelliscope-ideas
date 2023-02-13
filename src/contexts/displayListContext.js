import React, { createContext, useContext, useState, useMemo } from 'react';

const displayList = [
  {
    name: 'life_expectancy',
    description: 'Gapminder life expectancy over time by country',
    tags: [],
    keysig: '1258af3315ef6667a81ac39dc24da591',
    thumbnailurl: 'displays/life_expectancy/panels/Asia_Afghanistan.svg',
  },
  {
    name: 'GDP',
    description: 'Gapminder GDP per capita over time by country',
    tags: [],
    keysig: '1258af3315ef6667a81ac39dc24da591',
    thumbnailurl: 'displays/GDP/panels/Asia_Afghanistan.svg',
  },
];

const DisplayListContext = createContext({
  displayList,
  selectedDisplayObject: undefined,
  selectedDisplay: undefined,
  setSelectedDisplay: undefined,
  unselectedDisplays: undefined,
});

export const DisplayListProvider = ({ children }) => {
  const [selectedDisplay, setSelectedDisplay] = useState(displayList[0].name);

  const selectedDisplayObject = useMemo(
    () => displayList.filter((d) => d.name === selectedDisplay)[0],
    [displayList, selectedDisplay]
  );

  const unselectedDisplays = useMemo(
    () => displayList.filter((d) => d.name !== selectedDisplay),
    [displayList, selectedDisplay]
  );

  return (
    <DisplayListContext.Provider
      value={{
        displayList,
        selectedDisplayObject,
        selectedDisplay,
        setSelectedDisplay,
        unselectedDisplays,
      }}
    >
      {children}
    </DisplayListContext.Provider>
  );
};

export const useDisplayListContext = () => useContext(DisplayListContext);
