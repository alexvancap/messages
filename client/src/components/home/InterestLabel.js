import React from 'react';
import { Label, Icon } from 'semantic-ui-react';

export const InterestLabel = (props) => {
  return (
    <Label as='a'>
      {props.interest.name}
      <Icon name='delete' value={props.interest.id}/>
    </Label>
  );
};