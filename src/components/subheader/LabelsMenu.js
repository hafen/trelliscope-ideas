import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useLayoutContext } from '../../contexts/layoutContext';

export default function LabelsMenu({ columns, setColumns }) {
  const { layout } = useLayoutContext();

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
      <Button
        sx={{
          color: '#000000',
          fontWeight: 600,
          textTransform: 'unset',
          fontSize: '15px',
        }}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {layout === 'grid' ? 'Labels' : 'Columns'}
      </Button>
    </Box>
  );
}
