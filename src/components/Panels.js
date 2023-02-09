import React, { Fragment } from 'react';
import { InView } from 'react-intersection-observer';

export default function Panels({
  sidebarWidth,
  sidebarOpen,
  data,
  sortVars,
  sortBarWidth,
  labelVars,
  columns,
  setPanelInView,
}) {
  return (
    <div
      style={{
        width: `calc(100vw - ${
          sidebarWidth * sidebarOpen + sortVars.length * sortBarWidth + 1
        }px)`,
        height: 'calc(100vh - 108px)',
        overflowY: 'auto',
        padding: 8,
      }}
    >
      <div
        style={{
          maxWidth: '100%',
          display: 'grid',
          gap: '10px',
          gridTemplateColumns: `repeat( ${columns}, 1fr )`,
        }}
      >
        {data.map((d) => (
          <Panel
            key={d.__PANEL_KEY__}
            data={d}
            labelVars={labelVars}
            sortVars={sortVars}
            setPanelInView={setPanelInView}
          />
        ))}
      </div>
    </div>
  );
}

function Panel({ data, labelVars, sortVars, setPanelInView }) {
  return (
    <InView
      as="div"
      threshold={1}
      onChange={(inView, entry) => {
        if (inView) {
          const res = {};
          sortVars.forEach((vr) => {
            res[vr.name] = data[vr.name];
          });
          setPanelInView(res);
        }
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid rgb(234, 237, 240)',
          boxSizing: 'border-box',
        }}
      >
        <img
          style={{ width: '100%', objectFit: 'cover', aspectRatio: 1.6 }}
          src={`panels/${data.__PANEL_KEY__}.svg`}
        />
        <div
          style={{
            display: 'grid',
            gap: 0,
            gridTemplateColumns: '1fr 1fr',
            background: 'rgb(246, 246, 246)',
            fontSize: 14,
            marginLeft: -1,
            marginRight: -1,
            marginBottom: -1,
          }}
        >
          {labelVars.map((lbl) => (
            <Fragment key={lbl}>
              <div
                style={{
                  border: '1px solid rgb(234, 237, 240)',
                  paddingLeft: 8,
                  paddingRight: 8,
                  marginTop: -1,
                  fontWeight: 500,
                  overflow: 'hidden',
                  textOverflow: 'ellipses',
                  whiteSpace: 'nowrap',
                }}
              >
                {lbl}
              </div>
              <div
                style={{
                  border: '1px solid rgb(234, 237, 240)',
                  paddingLeft: 8,
                  paddingRight: 8,
                  marginTop: -1,
                  marginLeft: -1,
                  overflow: 'hidden',
                  textOverflow: 'ellipses',
                  whiteSpace: 'nowrap',
                }}
              >
                {data[lbl]}
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </InView>
  );
}
