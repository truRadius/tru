import * as React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

setOptions({
  name: 'truRadius',
  addonPanelInRight: true,
});

const stories = require.context('../src/stories', true, /\.tsx$/);

function loadStories() {
  stories.keys().forEach(filename => stories(filename));
}

const StylesDecorator = (storyFn) => (
	<div style={{fontFamily: 'Lato', height: '100%', width: '100%'}}>
    {storyFn()}
	</div>
);


addDecorator(StylesDecorator);
configure(loadStories, module);