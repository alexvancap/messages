import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Header, Icon, PlaceholderParagraph, Segment } from 'semantic-ui-react';

export const Bio = () => {
  const dispatch = useDispatch;
  const bio = useSelector(state => state.user.bio);

  const openEditModal = (modalType) =>
    dispatch({type: 'UPDATE_NESTED_STATE', state: 'home', nestedState: 'openModal', value: modalType})
  
  
  return(
    <Segment id='home-bio-segment'>
      <Header className='home-bio-header'>About me</Header>
      <PlaceholderParagraph>
        {bio}
      </PlaceholderParagraph>
      <Button 
        className='home-bio-edit-button' 
        size='mini'
        onClick={() => openEditModal('bio')} >
          <Icon name='edit' />
          Edit
      </Button>
    </Segment>
  )
}