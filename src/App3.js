import React, { useState, useMemo } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SidebarContent from './components/sidebar/SidebarContent';
import metas from './meta';
import metaData from './metaData';
import SortBar from './components/SortBar';
import LayoutMenu from './components/LayoutMenu';
import Panels from './components/Panels';
import Table from './components/Table';
import multiColumnSort from 'multi-column-sort';
import { useSortContext } from './contexts/sortContext';
import { useSidebarContext } from './contexts/sidebarContext';
import Subheader from './components/subheader/Subheader';

const sortBarWidth = 36;

const getColumnValue = (column, value) => value;

export default function App() {
  // const theme = useTheme();
  const { sidebarOpen, sidebarWidth } = useSidebarContext();
  const [selectedVars, setSelectedVars] = useState([
    metas[2],
    // metas[3],
    metas[0],
  ]);
  const { sortVars } = useSortContext();
  const [panelInView, setPanelInView] = useState({});
  const [labelVars, setLabelVars] = useState(['continent', 'country']);
  const [layout, setLayout] = React.useState('grid');
  const [columns, setColumns] = useState(3);

  const handleLayoutChange = (event) => {
    setLayout(event.target.value);
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

  const extraWidth =
    sidebarWidth * sidebarOpen + sortVars.length * sortBarWidth + 1;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={sidebarOpen && layout === 'grid'}
        color="default"
        sidebarWidth={sidebarWidth}
      >
        <Toolbar>
          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            {layout === 'grid' && <SettingsIcon />}
          </IconButton> */}
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Gapminder life expectancy over time by country
          </Typography>
          <LayoutMenu />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: sidebarWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={sidebarOpen}
      >
        <Header>
          {/* <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton> */}
        </Header>
        <SidebarContent
          metas={metas}
          selectedVars={selectedVars}
          setSelectedVars={setSelectedVars}
          labelVars={labelVars}
          setLabelVars={setLabelVars}
          sidebarWidth={sidebarWidth}
        />
      </Drawer>
      <Main open={sidebarOpen && layout === 'grid'} sidebarWidth={sidebarWidth}>
        <Header />
        {layout === 'grid' && (
          <div>
            <Subheader
              metas={metas}
              columns={columns}
              setColumns={setColumns}
              tot={metaData.length}
              extraWidth={extraWidth}
            />
            <Panels
              sidebarWidth={sidebarWidth}
              sidebarOpen={sidebarOpen}
              data={sortedMetaData}
              sortBarWidth={sortBarWidth}
              labelVars={labelVars}
              columns={columns}
              setColumns={setColumns}
              setPanelInView={setPanelInView}
              metas={metas}
            />
            <SortBar
              metas={metas}
              metaData={metaData}
              barWidth={sortBarWidth}
              panelInView={panelInView}
            />
          </div>
        )}
        {layout === 'table' && <Table metas={metas} data={metaData} />}
      </Main>
    </Box>
  );
}

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open, sidebarWidth }) => ({
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${sidebarWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open, sidebarWidth }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${sidebarWidth}px)`,
    marginLeft: `${sidebarWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Header = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
