import React, { useMemo } from 'react';
import { scaleQuantile } from 'd3-scale';
import { extent, nice } from 'd3-array';
import { useSortContext } from '../contexts/sortContext';
import { useSortBarContext } from '../contexts/sortBarContext';

const barFactory = {
  number: <NumberBar />,
  factor: <FactorBar />,
};

export default function SortBar({ metas, barWidth, metaData, panelInView }) {
  const { sortVars } = useSortContext();
  const { sortBar, barVarHeight } = useSortBarContext();
  const sortVar = sortVars[0];

  const meta = useMemo(() => {
    return metas.filter((d) => d.varname === sortVar.name)[0];
  });
  if (!sortBar) {
    return null;
  }
  return (
    <div
      style={{
        position: 'fixed',
        right: 0,
        top: 64,
        height: 'calc(100% - 64px)',
        width: barWidth,
      }}
    >
      <div
        style={{
          width: barWidth,
          boxSizing: 'border-box',
          background: 'lightgray',
          // border: '1px solid darkgray',
          height: '100%',
        }}
      >
        <div
          style={{
            height: barVarHeight + 1,
            paddingTop: 10,
            background: 'black',
            color: 'rgba(255,255,255,0.9)',
            border: '1px solid #444444',
            fontSize: 15,
            fontWeight: 600,
            paddingLeft: 6,
            marginLeft: -1,
            marginTop: -1,
          }}
        >
          <div style={{ writingMode: 'vertical-rl' }}>{sortVar.name}</div>
        </div>
        {barFactory[meta.type] &&
          React.cloneElement(barFactory[meta.type], {
            sortBar,
            currentValue: panelInView,
          })}
      </div>
    </div>
  );
}

function FactorBar({ sortBar, currentValue }) {
  const { steps, actBarHeight } = sortBar;

  return (
    <>
      {steps.map((d) => {
        const isInScroll = currentValue && d.levels.includes(currentValue);
        let extraStyle = {};
        if (isInScroll) {
          extraStyle = {
            background: 'rgba(255, 0, 0, 0.3)',
          };
        }
        return (
          <div
            key={d.levels[0]}
            style={{
              height: actBarHeight + 1,
              border: '1px solid #aaaaaa88',
              marginLeft: -1,
              marginTop: -1,
              ...extraStyle,
            }}
          >
            <div
              style={{
                writingMode: 'vertical-rl',
                textAlign: 'center',
                height: '100%',
                fontSize: 14,
                lineHeight: '14px',
                paddingLeft: 3,
              }}
            >
              {d.levels.length === 1 && (
                <div style={{ paddingLeft: 7 }}>{d.levels[0]}</div>
              )}
              {d.levels.length > 1 && (
                <>
                  <div>{`${d.levels[0]} —`}</div>
                  <div>{`${d.levels[d.levels.length - 1]}`}</div>
                </>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}

function NumberBar({ sortBar, currentValue }) {
  const { steps, actBarHeight } = sortBar;

  return (
    <>
      {steps.map((d) => {
        const isInScroll =
          currentValue && currentValue > d.start && currentValue <= d.end;
        let extraStyle = {};
        if (isInScroll) {
          extraStyle = {
            background: 'rgba(255, 0, 0, 0.3)',
          };
        }
        return (
          <div
            key={d.start}
            style={{
              height: actBarHeight + 1,
              border: '1px solid #aaaaaa88',
              marginLeft: -1,
              marginTop: -1,
              ...extraStyle,
            }}
          >
            <div
              style={{
                writingMode: 'vertical-rl',
                textAlign: 'center',
                height: '100%',
                fontSize: 14,
                lineHeight: '14px',
                paddingLeft: 3,
              }}
            >
              <div>{`${d.start} —`}</div>
              <div>{`${d.end}`}</div>
            </div>
          </div>
        );
      })}
    </>
  );
}
