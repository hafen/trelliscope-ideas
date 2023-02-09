import React, { useMemo, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
// import 'ag-grid-community/styles/ag-theme-material.css';

export default function Table({ metas, data }) {
  const [height, setHeight] = useState(75);
  const gridRef = useRef();

  const handleSliderChange = (event, newValue) => {
    if (typeof newValue === 'number') {
      setHeight(newValue);
    }
    // gridRef.current.api.redrawRows();
    // gridRef.current.api.onRowHeightChanged();
    gridRef.current.api.resetRowHeights();
  };

  const columns = useMemo(() => {
    const res = [
      {
        field: '__PANEL_KEY__',
        pinned: 'left',
        headerName: 'panel',
        width: height * 1.6 + 20,
        autoHeight: true,
        cellRenderer: (params) => {
          return (
            <img
              style={{ height, objectFit: 'cover', aspectRatio: 1.6 }}
              src={`panels/${params.value}.svg`}
            />
          );
        },
      },
    ];
    metas
      // .filter((d) => d.varname !== '__PANEL_KEY__')
      .forEach((d) => {
        {
          const cur = {
            field: d.varname,
            headerName: d.varname,
            filter: 'agTextColumnFilter',
            sortable: true,
            headerTooltip: d.label,
          };
          if (d.type === 'number') {
            cur.type = 'numberColumn';
            cur.cellRenderer = (params) =>
              params.value.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              });
          }
          res.push(cur);
        }
      });
    return res;
  }, [data, height]);

  const columnTypes = useMemo(() => {
    return {
      numberColumn: {
        filter: 'agNumberColumnFilter',
        cellStyle: { textAlign: 'right' },
        width: 150,
        headerStyle: { textAlign: 'right' },
      },
      dateColumn: { filter: 'agDateColumnFilter' },
    };
  }, []);

  return (
    <div
      className="ag-theme-alpine"
      style={{
        height: 'calc(100vh - 100px)',
        width: 'calc(100vw)',
        paddingTop: 20,
      }}
    >
      <Box
        width={300}
        sx={{ display: 'flex', flexDirection: 'row', pb: 2, pl: 2 }}
      >
        Thumbnail height:
        <Slider
          sx={{ zIndex: 2000 }}
          value={height}
          onChange={handleSliderChange}
          min={30}
          max={150}
          aria-label="Default"
          // marks={marks}
          valueLabelDisplay="auto"
        />
      </Box>
      <AgGridReact
        ref={gridRef}
        rowData={data}
        columnDefs={columns}
        columnTypes={columnTypes}
        // autoHeight={true}
        tooltipShowDelay={300}
      />
      ;
    </div>
  );
}

// import styles from 'react-data-grid/lib/styles.css';
// import 'react-data-grid/lib/styles.css';
// import DataGrid from 'react-data-grid';

// function rowKeyGetter(row) {
//   return row.__PANEL_KEY__;
// }

// export default function Table({ metas, data }) {
//   console.log('styles', styles)
//   const columns = useMemo(() => {
//     return metas
//       .filter((d) => d.varname !== '__PANEL_KEY__')
//       .map((d) => ({ key: d.varname, name: d.varname }));
//   }, [data]);

//   return <DataGrid columns={columns} rows={data} rowKeyGetter={rowKeyGetter} />;
// }
