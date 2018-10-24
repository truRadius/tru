import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { App } from 'src/modules/App';
import { RouterProvider } from 'react-router5';
import createRouter from './createRouter';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import './index.css';

const router = createRouter();

const defaultThemeJson = require('./defaultTheme.json');
const defaultTheme = createMuiTheme(defaultThemeJson);

const wrappedApp = (
  <MuiThemeProvider theme={defaultTheme}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </MuiThemeProvider>
);

router.start(() => {
  ReactDOM.render(wrappedApp, document.getElementById('root'));
});