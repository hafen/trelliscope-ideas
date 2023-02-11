import React from 'react';
import VariableMultiSelect from './VariableMultiSelect';
import Divider from '@mui/material/Divider';
import ExploreItem from './ExploreItem';

export default function SidebarContent({
  metas,
  selectedVars,
  setSelectedVars,
  labelVars,
  setLabelVars,
}) {
  return (
    <div style={{ overflow: 'hidden', marginTop: 76 }}>
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
            <ExploreItem
              meta={d}
              selectedVars={selectedVars}
              setSelectedVars={setSelectedVars}
              labelVars={labelVars}
              setLabelVars={setLabelVars}
            />
            <Divider />
          </div>
        ))}
      </div>
    </div>
  );
}
