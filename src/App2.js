import React, { useState, useMemo } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SidebarContent from './components/SidebarContent';
import metas from './meta';
import metaData from './metaData';
import SortBars from './components/SortBars';
import LayoutMenu from './components/LayoutMenu';
import PanelContent from './components/PanelContent';
import Table from './components/Table';
import multiColumnSort from 'multi-column-sort';

const sidebarWidth = 400;
const sortBarWidth = 36;

const getColumnValue = (column, value) => value;

export default function App() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [selectedVars, setSelectedVars] = useState([
    metas[2],
    metas[3],
    metas[0],
  ]);
  const [sortVars, setSortVars] = useState([
    { name: 'continent', dir: 'DESC' },
    { name: 'country', dir: 'ASC' },
    { name: 'mean_gdp', dir: 'ASC' },
  ]);
  const [panelInView, setPanelInView] = useState({});
  const [labelVars, setLabelVars] = useState(['continent', 'country']);
  const [layout, setLayout] = React.useState('grid');
  const [columns, setColumns] = useState(3);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const sortedMetaData = useMemo(() => {
    if (sortVars.length === 0) {
      return metaData;
    }
    return multiColumnSort(
      [...metaData],
      sortVars.map((d) => Object.values(d)),
      getColumnValue
    );
  }, [metaData, sortVars]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        color="default"
      >
        <Toolbar>
          {!open && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2 }}
            >
              <SettingsIcon />
            </IconButton>
          )}
          {open && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerClose}
              edge="start"
              sx={{ mr: 2 }}
            >
              <CloseIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div">
          Gapminder life expectancy over time by country
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: sidebarWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <div style={{marginTop: 15, overflow: 'hidden'}}>
        <SidebarContent
          metas={metas}
          selectedVars={selectedVars}
          setSelectedVars={setSelectedVars}
          sortVars={sortVars}
          setSortVars={setSortVars}
          labelVars={labelVars}
          setLabelVars={setLabelVars}
          sidebarWidth={sidebarWidth}
        />
        </div>
      </Drawer>
      <Box component="main">hi</Box>
    </Box>
  );
}
