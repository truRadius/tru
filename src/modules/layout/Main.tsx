import * as React from 'react';
// import { routeNode } from 'react-router5';
import Home from '../home/Home';

// tslint:disable-next-line:no-any
function Main({ route }: any) {
  const topRouteName = route.name.split('.')[0];

  if (topRouteName === 'home') {
    return <Home />;
  }

  return <h1>Page not found.</h1>;
}

export default Main;
