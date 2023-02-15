import * as React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SortProvider } from './contexts/sortContext';
import { SidebarProvider } from './contexts/sidebarContext';
import { LayoutProvider } from './contexts/layoutContext';
import { DisplayListProvider } from './contexts/displayListContext';
import { MetaDataProvider } from './contexts/metaDataContext';
import { SortBarProvider } from './contexts/sortBarContext';
import { WindowHeightProvider } from './contexts/windowHeightContext';
import { LabelProvider } from './contexts/labelContext';

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Poppins',
    },
  },
});

ReactDOM.createRoot(document.querySelector('#root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <WindowHeightProvider>
        <DisplayListProvider>
          <LayoutProvider>
            <LabelProvider>
              <SortProvider>
                <MetaDataProvider>
                  <SortBarProvider>
                    <SidebarProvider>
                      <App />
                    </SidebarProvider>
                  </SortBarProvider>
                </MetaDataProvider>
              </SortProvider>
            </LabelProvider>
          </LayoutProvider>
        </DisplayListProvider>
      </WindowHeightProvider>
    </ThemeProvider>
  </React.StrictMode>
);
