import React from 'react';
import Box from '@mui/material/Box';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useSidebarContext } from '../../contexts/sidebarContext';

export default function ExploreMenu() {
  const { sidebarOpen, setSidebarOpen } = useSidebarContext();

  function handleOpen() {
    setSidebarOpen(true);
  }

  function handleClose() {
    setSidebarOpen(false);
  }

  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        mr: 3,
        background: '#efefef',
        // color: sidebarOpen ? '#FFFFFF' : '#000000',
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
        startIcon={sidebarOpen ? <CloseIcon /> : <MenuOpenIcon />}
        onClick={toggleSidebar}
      >
        Explore
      </Button>
    </Box>
  );
}
