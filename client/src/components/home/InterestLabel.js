import React from 'react';
import { Label, Icon } from 'semantic-ui-react';
import { useSocket } from '../../hooks/useSocket';

export const InterestLabel = (props) => {
  const socket = useSocket();

  const deleteLabel = () => {
    socket.emit('delete-users-interest', props.interest.id)
  };

  return (
    <Label 
      as='a' 
      className='home-interest-label'>
        {props.interest.name}
        <Icon 
          name='delete' 
          value={props.interest.id}
          onClick={deleteLabel}
        />
    </Label>
  );
};