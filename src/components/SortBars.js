import React from 'react';
import SortBar from './SortBar';

export default function SortBars({
  sortVars,
  metas,
  metaData,
  barWidth,
  panelInView,
}) {
  return (
    <div
      style={{
        position: 'fixed',
        right: 0,
        top: 64,
        height: 'calc(100% - 64px)',
        width: barWidth * sortVars.length,
        background: 'red',
      }}
    >
      {sortVars.map((d, ii) => (
        <SortBar
          key={d.name}
          sortVar={d}
          sortIndex={ii}
          barWidth={barWidth}
          meta={metas.filter((mt) => mt.varname === d.name)[0]}
          metaData={metaData}
          inView={panelInView[d.name]}
        />
      ))}
    </div>
  );
}
