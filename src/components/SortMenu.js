import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import VariableSelect from './VariableSelect';
import { styled } from '@mui/material/styles';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function SortMenu({ metas, sortVars, setSortVars }) {
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

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Box
          sx={{
            fontSize: 15,
            fontWeight: 600,
            lineHeight: '35px',
            fontSize: 16,
            pr: 0.5,
          }}
        >
          Sort:
        </Box>
        <Box>
          <Box
            sx={{
              display: 'flex',
              // justifyContent: 'center',
              // flexWrap: 'wrap',
              listStyle: 'none',
              m: 0,
            }}
          >
            {sortVars.map((d) => {
              let label = (
                <span>
                  <SouthIcon fontSize="inherit" />
                  {d.name}
                </span>
              );
              if (d.dir === 'DESC') {
                label = (
                  <span>
                    <NorthIcon fontSize="inherit" />
                    {d.name}
                  </span>
                );
              }
              return (
                <ListItem key={d.name}>
                  <Chip
                    color="primary"
                    label={label}
                    size="small"
                    onClick={() => handleChangeDir(d.name)}
                    onDelete={() => handleDelete(d.name)}
                  />
                </ListItem>
              );
            })}
          </Box>
        </Box>
        <SortSelect
          metas={metas}
          sortVars={sortVars}
          setSortVars={setSortVars}
        />
      </Box>
    </Box>
  );
}

function SortSelect({ metas, sortVars, setSortVars }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const newMetas = React.useMemo(() => {
    const sortNames = sortVars.map((d) => d.name);
    return metas.filter((d) => !sortNames.includes(d.varname));
  }, [metas, sortVars]);

  const handleClick = () => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };

  const handleSelect = (event, value) => {
    setOpen(false);
    const newSortVars = [...sortVars];
    newSortVars.push({ name: value.varname, dir: 'ASC' });
    setSortVars(newSortVars);
  };

  return (
    <Box>
      <Popper open={open} anchorEl={anchorEl} placement="bottom-end" transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={0}>
            <div style={{ width: 350, background: '#FFFFFF' }}>
              <VariableSelect
                metas={newMetas}
                handleSelect={handleSelect}
                nSortVars={sortVars.length}
              />
            </div>
          </Fade>
        )}
      </Popper>
      <IconButton onClick={handleClick()} aria-label="delete" fontSize="small">
        <AddCircleIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
