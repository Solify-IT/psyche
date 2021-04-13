import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#C94B72',
    },
  },
});

console.log(`Server running with API URL: ${process.env.REACT_APP_API_URL}`);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
