import React, { useMemo, useState, useRef, useCallback } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { DataEditor } from '@glideapps/glide-data-grid';
import '@glideapps/glide-data-grid/dist/index.css';
import { useDisplayListContext } from '../contexts/displayListContext';

export default function Table({
  sidebarWidth,
  sidebarOpen,
  sortBarWidth,
  metas,
  data,
}) {
  const [height, setHeight] = useState(75);
  const gridRef = useRef();
  const { selectedDisplayObject } = useDisplayListContext();
  const panelPrefix = `displays/${selectedDisplayObject.name}/panels`;

  // TODO: make this react to scrollbar clicked (scrollTo(col, row))
  // gridRef.current?.scrollTo(1, 2, 'both', 0, 0, {
  //   vAlign: 'start',
  //   hAlign: 'start',
  // });

  const handleSliderChange = (event, newValue) => {
    if (typeof newValue === 'number') {
      setHeight(newValue);
    }
    // gridRef.current.api.redrawRows();
    // gridRef.current.api.onRowHeightChanged();
    // gridRef.current.api.resetRowHeights();
  };

  const columns = useMemo(() => {
    const res = [
      {
        id: '__PANEL_KEY__',
        title: 'panel',
        width: height * 1.6 + 20,
        type: 'image',
        // cellRenderer: (params) => {
        //   return (
        //     <img
        //       style={{ height, objectFit: 'cover', aspectRatio: 1.6 }}
        //       src={`panels/${params.value}.svg`}
        //       alt="panel thumbnail"
        //     />
        //   );
        // },
      },
    ];
    metas
      // .filter((d) => d.varname !== '__PANEL_KEY__')
      .forEach((d) => {
        const cur = {
          id: d.varname,
          title: d.varname,
          type: d.type,
          grow: 7,
          // filter: 'agTextColumnFilter',
          // sortable: true,
          // headerTooltip: d.label,
        };
        // if (d.type === 'number') {
        //   cur.type = 'numberColumn';
        //   cur.cellRenderer = (params) =>
        //     params.value.toLocaleString(undefined, {
        //       minimumFractionDigits: 2,
        //       maximumFractionDigits: 2,
        //     });
        // }
        res.push(cur);
      });
    return res;
  }, [data, height]);

  const getContent = useCallback(
    (cell) => {
      const [col, row] = cell;
      // console.log(col, row);
      const dataRow = data[row];
      const curVal = dataRow[columns[col].id];
      let d = `${curVal}`;
      // const d = `${dataRow[columns[col].id]}`;
      // if (col === 0) {

      // }
      const type = columns[col].type;
      let kind;
      let contentAlign = 'left';
      if (type === 'image') {
        d = `${panelPrefix}/${curVal}.svg`;
        kind = 'image';
      } else if (['string', 'factor'].includes(type)) {
        kind = 'text';
      } else if (type === 'number') {
        kind = 'number';
        d = curVal.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      } else {
        kind = 'text';
      }
      return {
        kind: kind,
        allowOverlay: false,
        displayData: d,
        data: d,
        contentAlign: 'right',
        headerAlign: contentAlign,
      };
    },
    [data]
  );

  return (
    <div
      style={{
        height: 'calc(100vh - 150px)',
        paddingLeft: 10,
        width: `calc(100vw - ${sidebarWidth * sidebarOpen + sortBarWidth}px)`,
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
      <DataEditor
        ref={gridRef}
        getCellContent={getContent}
        columns={columns}
        rows={data.length}
        freezeColumns={1}
        smoothScrollX={true}
        // onHeaderClicked
        // headerIcons={headerIcons}
        // width={1270}
        width={900}
      />
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
