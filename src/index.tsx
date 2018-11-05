import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { App } from 'src/modules/App';
// import createRouter from './createRouter';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import './index.css';

// const router = createRouter();

const defaultThemeJson = require('./defaultTheme.json');
const defaultTheme = createMuiTheme(defaultThemeJson);

const wrappedApp = (
  <MuiThemeProvider theme={defaultTheme}>
    <App />
  </MuiThemeProvider>
);

// router.start(() => {
ReactDOM.render(wrappedApp, document.getElementById('root'));
// });
