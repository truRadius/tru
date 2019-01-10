import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { App } from 'src/modules/App';
// import createRouter from './createRouter';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import './index.css';
import { Provider } from 'react-redux';
import store from './store';

// const router = createRouter();

const defaultThemeJson = require('./defaultTheme.json');
const defaultTheme = createMuiTheme(defaultThemeJson);

const wrappedApp = (
  <MuiThemeProvider theme={defaultTheme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>
);

// router.start(() => {
ReactDOM.render(wrappedApp, document.getElementById('root'));
// });
