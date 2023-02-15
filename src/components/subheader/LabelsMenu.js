import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import { useLayoutContext } from '../../contexts/layoutContext';
import { useLabelContext } from '../../contexts/labelContext';
import ColumnsSelect from './ColumnsSelect';

export default function LabelsMenu({ metas, columns, setColumns }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const { layout } = useLayoutContext();
  const { labelVars, setLabelVars } = useLabelContext();

  const handleClick = () => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };

  const handleSelect = (event, value) => {
    setOpen(false);
    // const newSortVars = [...sortVars];
    // newSortVars.push({ name: value.varname, dir: 'ASC' });
    // setSortVars(newSortVars);
  };

  const inputLabel =
    layout === 'grid'
      ? 'Search or select variables to show in label panels'
      : 'Search or select table columns to show';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        pr: 1,
        pl: 1.5,
        ml: 3,
        background: '#efefefaa',
        height: 34,
        borderRadius: 1,
      }}
    >
      <Popper open={open} anchorEl={anchorEl} placement="bottom-end" transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={0}>
            <div style={{ width: 350, background: '#FFFFFF' }}>
              <ColumnsSelect
                metas={metas}
                handleSelect={handleSelect}
                label={inputLabel}
              />
            </div>
          </Fade>
        )}
      </Popper>

      <Button
        sx={{
          color: '#000000',
          fontWeight: 600,
          textTransform: 'unset',
          fontSize: '15px',
        }}
        onClick={handleClick()}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {layout === 'grid' ? 'Labels' : 'Columns'}
      </Button>
    </Box>
  );
}
