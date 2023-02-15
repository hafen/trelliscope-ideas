import React, { createContext, useContext, useMemo, useRef } from 'react';
import { useSortContext } from './sortContext';
import { scaleQuantile } from 'd3-scale';
import { extent, nice } from 'd3-array';
import metas from '../meta';
import { useWindowHeightContext } from './windowHeightContext';
import { useMetaDataContext } from './metaDataContext';
import { HEADER_HEIGHT, MIN_SORT_BAR_HEIGHT } from '../constants';

const SortBarContext = createContext({
  sortBar: undefined,
  barVarHeight: undefined,
});

export const SortBarProvider = ({ children }) => {
  const { sortVars } = useSortContext();
  const { height } = useWindowHeightContext();
  const { sortedMetaData } = useMetaDataContext();
  const barVarHeight = 110; // TODO: calculate this based on the name of the sort var...
  const barHeight = height - HEADER_HEIGHT - barVarHeight;

  const sortBar = useMemo(() => {
    if (sortVars) {
      if (sortVars.length === 0) {
        return undefined;
      }
    }
    const meta = metas.filter((d) => d.varname === sortVars[0].name)[0];
    return barFactory[meta.type](sortedMetaData, meta, barHeight);
  }, [sortVars, barHeight, metas]);

  return (
    <SortBarContext.Provider value={{ sortBar, barVarHeight }}>
      {children}
    </SortBarContext.Provider>
  );
};

export const useSortBarContext = () => useContext(SortBarContext);

function getFactorSortBars(metaData, meta, height) {
  const nLevels = meta.levels.length;
  const nBars = Math.min(Math.floor(height / MIN_SORT_BAR_HEIGHT), nLevels);
  const actBarHeight = height / nBars;
  const step = Math.ceil(nLevels / nBars);
  const steps = [];
  for (let index = 0; index < nLevels; index += step) {
    const end = Math.min(index + step - 1, nLevels - 1);
    let curLevels;
    if (index === end) {
      curLevels = [meta.levels[index]];
    } else {
      curLevels = meta.levels.slice(index, end);
    }
    steps.push({
      // startKey: metaData.__PANEL_KEY
      start: index,
      end,
      levels: curLevels,
    });
  }
  return { steps, actBarHeight };
}

function getNumberSortBars(metaData, meta, height) {
  const nBars = Math.floor(height / MIN_SORT_BAR_HEIGHT);
  const d = metaData.map((d) => d[meta.varname]);
  const xtnt = extent(d);
  const scl = scaleQuantile()
    .domain(d)
    .range([...Array(nBars).keys()]);
  const qnt = scl.quantiles();
  const tmp1 = nice(xtnt[0], qnt[0], 4);
  const steps = [
    {
      start: tmp1[0],
      end: tmp1[1],
    },
  ];
  for (let index = 1; index < qnt.length; index++) {
    const tmp = nice(qnt[index - 1], qnt[index], 4);
    steps.push({
      start: steps[index - 1].end,
      end: tmp[1],
    });
  }
  const tmp2 = nice(qnt[qnt.length - 1], xtnt[1], 4);
  steps.push({
    start: steps[steps.length - 1].end,
    end: tmp2[1],
  });
  const actBarHeight = height / nBars;

  // console.log(steps)
  // console.log(xtnt)
  // console.log(nice(xtnt[0], qnt[0], 4))
  // console.log(nice(qnt[0], qnt[1], 4))
  // console.log(nice(qnt[1], qnt[2], 4))
  // console.log(nice(qnt[2], qnt[3], 4))
  // console.log(nice(qnt[3], xtnt[1], 4))
  // console.log(qnt)

  return { steps, actBarHeight };
}

const barFactory = {
  number: getNumberSortBars,
  factor: getFactorSortBars,
};
