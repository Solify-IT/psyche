import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from './App';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#C94B72',
    },
    secondary: {
      main: '#6EA84F',
      contrastText: '#fff',
    },
  },
  typography: {
    body2: {
      fontSize: 21,
      main: '#3f4238',
    },
  },
});

console.log(`Server running with API URL: ${process.env.REACT_APP_API_URL}`);
ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
