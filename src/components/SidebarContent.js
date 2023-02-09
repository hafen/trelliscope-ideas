import React from 'react';
import VariableMultiSelect from './VariableMultiSelect';
import Divider from '@mui/material/Divider';
import VariableItem from './VariableItem';

export default function SidebarContent({
  metas,
  selectedVars,
  setSelectedVars,
  sortVars,
  setSortVars,
  labelVars,
  setLabelVars,
  sidebarWidth,
}) {
  return (
    <div style={{ overflow: 'hidden' }}>
      <VariableMultiSelect
        selectedVars={selectedVars}
        setSelectedVars={setSelectedVars}
        metas={metas}
      />
      <div
        style={{
          height: 'calc(100vh - 135px)',
          overflowY: 'auto',
        }}
      >
        {selectedVars.map((d) => (
          <div key={d.varname}>
            <VariableItem
              meta={d}
              selectedVars={selectedVars}
              setSelectedVars={setSelectedVars}
              sortVars={sortVars}
              setSortVars={setSortVars}
              labelVars={labelVars}
              setLabelVars={setLabelVars}
              sidebarWidth={sidebarWidth}
            />
            <Divider />
          </div>
        ))}
      </div>
    </div>
  );
}
