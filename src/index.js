import * as React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SortProvider } from './contexts/sortContext';
import { SidebarProvider } from './contexts/sidebarContext';
import { LayoutProvider } from './contexts/layoutContext';
import { DisplayListProvider } from './contexts/displayListContext';

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
      <DisplayListProvider>
        <LayoutProvider>
          <SortProvider>
            <SidebarProvider>
              <App />
            </SidebarProvider>
          </SortProvider>
        </LayoutProvider>
      </DisplayListProvider>{' '}
    </ThemeProvider>
  </React.StrictMode>
);
