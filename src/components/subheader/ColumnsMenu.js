import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export default function ColumnsMenu({ columns, setColumns }) {
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
        minWidth: 140,
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
      <Box sx={{ pr: 0.5, fontSize: 15, fontWeight: 600, lineHeight: '35px' }}>
        Columns:
      </Box>
      <TextField
        sx={{ maxWidth: 50, minWidth: 30, pt: 0.6 }}
        variant="standard"
        type="number"
        size="small"
        inputProps={{
          inputMode: 'numeric',
          pattern: '[0-9]*',
          style: { marginBottom: -4, textAlign: 'center' },
        }}
        value={columns}
        onChange={handleChange}
      />
    </Box>
  );
}
