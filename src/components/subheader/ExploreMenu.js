import React from 'react';
import Box from '@mui/material/Box';
// import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Button from '@mui/material/Button';
import { useSidebarContext } from '../../contexts/sidebarContext';

export default function ExploreMenu() {
  const { sidebarOpen, setSidebarOpen } = useSidebarContext();

  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        mr: 3,
        // ml: sidebarOpen ? -2 : 0,
        zIndex: sidebarOpen ? 2000 : 'auto',
        background: '#efefefaa',
        height: 34,
        // borderRadiusTopRight: 1,
        // borderRadiusBottomRight: 1,
      }}
    >
      <Button
        variant={sidebarOpen ? 'contained' : 'text'}
        sx={{
          color: sidebarOpen ? '#FFFFFF' : '#000000',
          fontWeight: 600,
          textTransform: 'unset',
          fontSize: '15px',
          borderRadius: 0,
        }}
        startIcon={sidebarOpen ? <CloseIcon /> : <KeyboardArrowLeftIcon />}
        onClick={toggleSidebar}
      >
        Explore
      </Button>
    </Box>
  );
}
