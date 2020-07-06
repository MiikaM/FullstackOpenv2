import React from 'react';
import { Icon } from 'semantic-ui-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GenderIcon = ({ gender }: any) => {

  switch (gender) {
    case 'male':
      return <Icon className={`mars icon`} />;
    case 'female':
      return <Icon className={`venus icon`} />;
    case 'other':
      return <Icon className={`mercury icon`} />;
    default:
      return null;
  }

};

export default GenderIcon;
