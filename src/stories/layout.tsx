import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { OrganizationProfile } from '../modules/profile/OrganizationProfile';

storiesOf('Profile Pages', module)
.add('Organization Profile Page', () => {
  return (
    <OrganizationProfile />
  );
});