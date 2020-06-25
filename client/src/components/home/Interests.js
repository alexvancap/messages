import React from 'react';
import { useDispatch } from 'react-redux';
import { Segment, Header, Button, Icon } from 'semantic-ui-react';

export const Interests = () => {
  const dispatch = useDispatch();

  const openEditModal = (modalType) =>
    dispatch({type: 'UPDATE_NESTED_STATE', state: 'home', nestedState: 'openModal', value: modalType})

  return (
    <Segment id='home-interests-segment'>
      <Header className='home-bio-header'>Interests</Header>
      <Button 
        className='home-bio-edit-button' 
        size='mini'
        onClick={() => openEditModal('interests')}>
          <Icon name='edit' />
          Edit
      </Button>
    </Segment>
  );
};