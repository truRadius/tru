import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { NavBar } from '../modules/layout/NavBar';

storiesOf('Layout', module)
.add('NavBar', () => {
  return (
    <NavBar />
  );
});