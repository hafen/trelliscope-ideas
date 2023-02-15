import React, { useMemo, useState, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useDisplayListContext } from '../contexts/displayListContext';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function Table({
  sidebarWidth,
  sidebarOpen,
  sortBarWidth,
  metas,
  data,
}) {
  const [height, setHeight] = useState(75);
  const [extraDisplays, setExtraDisplays] = useState([]);

  const { selectedDisplayObject, unselectedDisplays } = useDisplayListContext();

  const handleSliderChange = (event, newValue) => {
    if (typeof newValue === 'number') {
      setHeight(newValue);
    }
  };

  const columns = useMemo(() => {
    const panelPrefix = `displays/${selectedDisplayObject.name}/panels`;
    const res = [
      {
        field: '__PANEL_KEY__',
        headerName: `${selectedDisplayObject.name} vis`,
        width: height * 1.6 + 20,
        renderCell: (params) => (
          <img
            style={{ height, objectFit: 'cover', aspectRatio: 1.6 }}
            src={`${panelPrefix}/${params.value}.svg`}
            alt="panel thumbnail"
          />
        ),
      },
    ];
    extraDisplays.forEach((d) => {
      res.push({
        field: '',
        headerName: `${d.name} vis`,
        width: height * 1.6,
        renderCell: (params) => (
          <img
            style={{ height, objectFit: 'cover', aspectRatio: 1.6 }}
            src={`displays/${d.name}/panels/${params.row.__PANEL_KEY__}.svg`}
            alt="panel thumbnail"
          />
        ),
      });
    });
    metas
      // .filter((d) => d.varname !== '__PANEL_KEY__')
      .forEach((d) => {
        const cur = {
          field: d.varname,
          headerTooltip: d.label,
        };
        if (d.type === 'number') {
          cur.type = 'number';
          cur.valueFormatter = (params) =>
            params.value.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
        }
        if (d.type === 'href') {
          cur.renderCell = (params) => (
            <a href={params.value} target="_blank" rel="noreferrer">
              link
            </a>
          );
        }
        res.push(cur);
      });
    return res;
  }, [data, height, selectedDisplayObject, extraDisplays]);

  return (
    <div
      style={{
        height: 'calc(100vh - 170px)',
        width: `calc(100vw - ${sidebarWidth * sidebarOpen + sortBarWidth}px)`,
        paddingTop: 20,
      }}
    >
      <Box
        // width={230}
        sx={{ display: 'flex', flexDirection: 'row', pb: 2, pl: 2 }}
      >
        <div style={{ width: 90, whiteSpace: 'nowrap' }}>Image size</div>
        <div style={{ paddingLeft: 10, width: 130 }}>
          <Slider
            sx={{ zIndex: 2000 }}
            value={height}
            onChange={handleSliderChange}
            min={30}
            max={300}
            size="small"
            aria-label="Default"
            // marks={marks}
            valueLabelDisplay="auto"
          />
        </div>
        <AddDisplay
          unselectedDisplays={unselectedDisplays}
          extraDisplays={extraDisplays}
          setExtraDisplays={setExtraDisplays}
        />
      </Box>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            rows={data}
            rowHeight={height}
            columns={columns}
            getRowId={(row) => row.__PANEL_KEY__}
            hideFooter
          />
        </div>
      </div>
    </div>
  );
}

function AddDisplay({ unselectedDisplays, extraDisplays, setExtraDisplays }) {
  return (
    <Autocomplete
      size="small"
      multiple
      value={extraDisplays}
      onChange={(event, newValue) => {
        setExtraDisplays(newValue);
      }}
      limitTags={2}
      options={unselectedDisplays}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Additional displays"
          variant="standard"
          size="small"
        />
      )}
      sx={{ width: '250px', ml: 2 }}
    />
  );
}
