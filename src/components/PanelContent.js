import React from 'react';
import Panels from './Panels';
import ColumnsMenu from './ColumnsMenu';
import SortMenu from './SortMenu';

export default function PanelContent({
  metas,
  sidebarWidth,
  sidebarOpen,
  data,
  sortVars,
  setSortVars,
  sortBarWidth,
  labelVars,
  columns,
  setColumns,
  setPanelInView,
}) {
  const extraWidth =
    sidebarWidth * sidebarOpen + sortVars.length * sortBarWidth + 1;
  return (
    <div>
      <PanelHeader
        metas={metas}
        columns={columns}
        setColumns={setColumns}
        tot={data.length}
        extraWidth={extraWidth}
        sortVars={sortVars}
        setSortVars={setSortVars}
      />
      <Panels
        sidebarWidth={sidebarWidth}
        sidebarOpen={sidebarOpen}
        data={data}
        sortVars={sortVars}
        sortBarWidth={sortBarWidth}
        labelVars={labelVars}
        columns={columns}
        setColumns={setColumns}
        setPanelInView={setPanelInView}
      />
    </div>
  );
}

function PanelHeader({
  metas,
  columns,
  setColumns,
  tot,
  extraWidth,
  sortVars,
  setSortVars,
}) {
  return (
    <div
      style={{
        width: `calc(100vw - ${extraWidth}px)`,
        display: 'flex',
        flexDirection: 'row',
        borderBottom: '1px solid #bbbbbb',
        background: '#42a5f544',
        paddingTop: 7,
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
        <div
          style={{ lineHeight: '35px', fontWeight: 500, paddingRight: 40 }}
        >{`**—** of ${tot} panels `}</div>
        <ColumnsMenu columns={columns} setColumns={setColumns} />
      </div>
      <div>
        <SortMenu metas={metas} sortVars={sortVars} setSortVars={setSortVars} />
      </div>
    </div>
  );
}
