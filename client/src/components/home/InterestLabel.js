import React from 'react';
import { Label, Icon } from 'semantic-ui-react';

export const InterestLabel = (interest) => {
  return (
    <Label as='a'>
      {interest.name}
      <Icon name='delete' value={interest.id}/>
    </Label>
  );
};