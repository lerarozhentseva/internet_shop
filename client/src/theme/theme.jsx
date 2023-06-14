import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a1a3d',
      contrastText: '#f5f5f7'
    },
    secondary: {
      main: '#1e3053',
      contrastText: '#333333'
    }
  }
});

export default theme;