import React, { useMemo } from 'react';
import { scaleQuantile } from 'd3-scale';
import { extent, nice } from 'd3-array';
import { useWindowHeight } from '@react-hook/window-size';
import { useSortContext } from '../contexts/sortContext';

const headerHeight = 64;

// minimum height that a section of the bar can be...
const minBarHeight = 150;
const barVarHeight = 110;

const barFactory = {
  number: <NumberBar />,
  factor: <FactorBar />,
};

export default function SortBar({ metas, barWidth, metaData, panelInView }) {
  const height = useWindowHeight() - headerHeight;
  const { sortVars } = useSortContext();
  const sortVar = sortVars[0];
  const meta = useMemo(() => {
    return metas.filter((d) => d.varname === sortVar.name)[0];
  });
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
            meta,
            height: height - barVarHeight,
            currentValue: panelInView,
            metaData,
          })}
      </div>
    </div>
  );
}

function FactorBar({ meta, height, currentValue }) {
  const { steps, actBarHeight } = useMemo(() => {
    const nLevels = meta.levels.length;
    const nBars = Math.min(Math.floor(height / minBarHeight), nLevels);
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
        start: index,
        end,
        levels: curLevels,
      });
    }
    return { steps, actBarHeight };
  }, [meta, height, minBarHeight]);

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

function NumberBar({ meta, height, metaData, currentValue }) {
  const { steps, actBarHeight } = useMemo(() => {
    const nBars = Math.floor(height / minBarHeight);
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
    return { steps, actBarHeight };
  }, [meta, metaData, height, minBarHeight]);

  // console.log(steps)
  // console.log(xtnt)
  // console.log(nice(xtnt[0], qnt[0], 4))
  // console.log(nice(qnt[0], qnt[1], 4))
  // console.log(nice(qnt[1], qnt[2], 4))
  // console.log(nice(qnt[2], qnt[3], 4))
  // console.log(nice(qnt[3], xtnt[1], 4))
  // console.log(qnt)

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
