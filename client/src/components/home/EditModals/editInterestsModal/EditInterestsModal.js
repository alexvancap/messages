import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { InterestsDropdown } from './InterestsDropdown';
import { useSocket } from '../../../../hooks/useSocket';

export const EditInterestsModal = () => {
  const dispatch = useDispatch();
  const socket = useSocket();
  const selectedInterests = useSelector(state => state.home.selectedInterests);
  const interests = useSelector(state => state.home.interests)

  const closeModal = () => 
    dispatch({type: 'UPDATE_NESTED_STATE', state: 'home', nestedState: 'openModal', value: ''})

  const submitInterests = (e, { value }) => {
    socket.emit('create-interests', selectedInterests)
    closeModal()
  };

  return (
    <Modal 
      size={'small'} 
      open={true} 
      onClose={closeModal}
      closeOnDimmerClick={false}>
      <Modal.Header>Select your interests</Modal.Header>
      <Modal.Content>
        <InterestsDropdown />
      </Modal.Content>
      <Modal.Actions>
        <Button 
          negative
          content='Cancel'
          onClick={closeModal}
        />
        <Button
          positive
          icon='checkmark'
          labelPosition='right'
          content='Update'
          onClick={submitInterests}
        />
      </Modal.Actions>
    </Modal>
  );
};