import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SortIcon from '@mui/icons-material/Sort';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import Chip from '@mui/material/Chip';

export default function VariableItem({
  meta,
  selectedVars,
  setSelectedVars,
  sortVars,
  setSortVars,
  labelVars,
  setLabelVars,
  sidebarWidth,
}) {
  function handleRemove(val) {
    setSelectedVars(selectedVars.filter((d) => d.varname !== val));
  }
  function handleLabelChange(val) {
    if (!labelVars.includes(val)) {
      setLabelVars([...labelVars, val]);
    } else {
      setLabelVars(labelVars.filter((d) => d !== val));
    }
  }
  function handleSortClick(name) {
    setSortVars([{ name, dir: 'ASC' }]);
  }

  function handleDelete(val) {
    const newSortVars = [...sortVars];
    setSortVars(newSortVars.filter((d) => d.name !== val));
  }

  function handleChangeDir(val) {
    const newSortVars = [...sortVars];
    for (let ii = 0; ii < newSortVars.length; ii++) {
      if (newSortVars[ii].name === val) {
        newSortVars[ii].dir = newSortVars[ii].dir === 'ASC' ? 'DESC' : 'ASC';
        setSortVars(newSortVars);
        break;
      }
    }
  }

  const showLabel = labelVars.includes(meta.varname);
  const sortBy = sortVars.filter((d) => d.name === meta.varname);

  return (
    <div style={{ paddingTop: 10, paddingBottom: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <div style={{ paddingLeft: 10 }}>
          <div
            style={{
              fontWeight: 700,
              width: sidebarWidth - 45,
            }}
          >
            {meta.varname}
          </div>
          {meta.label !== meta.varname && (
            <div
              style={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                fontStyle: 'italic',
                fontSize: 14,
                width: sidebarWidth - 45,
              }}
            >
              {meta.label}
            </div>
          )}
        </div>
        <div>
          <IconButton
            onClick={() => handleRemove(meta.varname)}
            aria-label="close"
            size="small"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
      <div
        style={{
          width: '100%',
          height: 200,
          background: 'rgba(0,0,0,0.03)',
          color: 'rgba(0,0,0,0.3)',
          fontSize: 22,
          paddingTop: 60,
          paddingLeft: 40,
          paddingRight: 40,
          textAlign: 'center',
        }}
      >
        Interactive filter visualization goes here...
      </div>
      <div style={{ marginLeft: 10, display: 'flex', flexDirection: 'row' }}>
        <div style={{ flexGrow: 1 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={showLabel}
                onClick={() => handleLabelChange(meta.varname)}
                size="small"
              />
            }
            label="Show label"
          />
        </div>
        {sortBy.length === 0 && (
          <div style={{ paddingTop: 5, flexGrow: 1 }}>
            <Button
              onClick={() => handleSortClick(meta.varname)}
              size="small"
              variant="text"
              endIcon={<SortIcon />}
            >
              Sort By
            </Button>
          </div>
        )}
        {sortBy.length === 1 && (
          <div
            style={{
              paddingTop: 6,
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            {/* <div style={{lineHeight: '26px', paddingRight: 4}}>Sort:</div> */}
            <Chip
              color="primary"
              label={
                <span>
                  sorted{' '}
                  {sortBy[0].dir === 'ASC' ? (
                    <SouthIcon fontSize="inherit" />
                  ) : (
                    <NorthIcon fontSize="inherit" />
                  )}
                </span>
              }
              size="small"
              onClick={() => handleChangeDir(sortBy[0].name)}
              onDelete={() => handleDelete(sortBy[0].name)}
            />
          </div>
        )}
        <div style={{ paddingTop: 5 }}>
          <Button size="small" variant="text" endIcon={<RestartAltIcon />}>
            Clear filter
          </Button>
        </div>
      </div>
    </div>
  );
}
