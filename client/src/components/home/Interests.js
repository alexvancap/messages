import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Header, Icon, Label, Segment } from 'semantic-ui-react';
import history from './../../history';
import { useSocket } from './../../hooks/useSocket';
import { InterestLabel } from './InterestLabel';

export const Interests = () => {
  const dispatch = useDispatch();
  const socket = useSocket();
  const interests = useSelector(state => state.home.interests);

  useEffect(() => {
    if (!socket) return history.pushState('/login');
    socket
      .emit('get-interests')
      .on('get-interests', (interests) => 
        dispatch({
          type: 'UPDATE_NESTED_STATE', 
          state: 'home', 
          nestedState: 'interests', 
          value: interests
        })
      );
  }, []);

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
      <Container id='interests-container'>
        {
          interests.map(interest => (
            <InterestLabel interest={interest}/>
          ))
        }
        <Label as='a'>
          Tag
          <Icon name='delete' />
        </Label>
      </Container>
    </Segment>
  );
};