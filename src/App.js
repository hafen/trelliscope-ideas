import React, { useState, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import SidebarContent from './components/sidebar/SidebarContent';
import metas from './meta';
import metaData from './metaData';
import SortBar from './components/SortBar';
import Panels from './components/Panels';
import Table from './components/Table';
import multiColumnSort from 'multi-column-sort';
import { useSortContext } from './contexts/sortContext';
import { useSidebarContext } from './contexts/sidebarContext';
import { useLayoutContext } from './contexts/layoutContext';
import Subheader from './components/subheader/Subheader';
import Header from './components/Header';

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
  const { layout } = useLayoutContext();
  const [panelInView, setPanelInView] = useState({});
  const [labelVars, setLabelVars] = useState(['continent', 'country']);
  const [columns, setColumns] = useState(3);

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

  const extraWidth = sidebarWidth * sidebarOpen + sortBarWidth + 1;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        color="default"
      >
        <Toolbar>
          <Header />
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
        <SidebarContent
          metas={metas}
          selectedVars={selectedVars}
          setSelectedVars={setSelectedVars}
          labelVars={labelVars}
          setLabelVars={setLabelVars}
          sidebarWidth={sidebarWidth}
        />
      </Drawer>
      <Main open={sidebarOpen} sidebarWidth={sidebarWidth}>
        <Subheader
          metas={metas}
          columns={columns}
          setColumns={setColumns}
          tot={metaData.length}
          extraWidth={extraWidth}
        />
        {layout === 'grid' && (
          <div>
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
          </div>
        )}
        {layout === 'table' && (
          <Table
            sidebarWidth={sidebarWidth}
            sidebarOpen={sidebarOpen}
            sortBarWidth={sortBarWidth}
            metas={metas}
            data={sortedMetaData}
          />
        )}
        <SortBar
          metas={metas}
          metaData={metaData}
          barWidth={sortBarWidth}
          panelInView={panelInView}
        />
      </Main>
    </Box>
  );
}

const Main = styled('main', {
  shouldForwardProp: (prop) => !['open', 'sidebarWidth'].includes(prop),
})(({ theme, open, sidebarWidth }) => ({
  flexGrow: 1,
  marginTop: 64,
  overflow: 'hidden',
  height: 'calc(100vh - 68px)',
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
}));
