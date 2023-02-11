import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function LabelsMenu({ columns, setColumns }) {
  function handleChange(event) {
    let newVal = event.target.value;
    if (newVal < 1) {
      newVal = 1;
    } else if (newVal > 10) {
      newVal = 10;
    }
    setColumns(parseInt(newVal));
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        pr: 1,
        pl: 1.5,
        ml: 3,
        background: '#efefef',
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
        Labels
      </Button>
    </Box>
  );
}
