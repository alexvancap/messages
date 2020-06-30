import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'semantic-ui-react';
import { useSocket } from '../../../../hooks/useSocket';
import { Counter } from './Counter';
import { InterestsDropdown } from './InterestsDropdown';
import { ProgressBar } from './ProgressBar';

export const EditInterestsModal = () => {
  const dispatch = useDispatch();
  const socket = useSocket();
  const selectedInterests = useSelector(state => state.home.selectedInterests);
  const interests = useSelector(state => state.home.interests);
  const [maxInterests, setMaxIntersts] = useState(false);
  const selectedLength = selectedInterests.length + interests.length;


  const closeModal = () => 
    dispatch({type: 'UPDATE_NESTED_STATE', state: 'home', nestedState: 'openModal', value: ''});

  const submitInterests = () => {
    socket.emit('create-interests', selectedInterests);
    dispatch({type: 'UPDATE_NESTED_STATE', state: 'home', nestedState: 'selectedInterests', value: []});
    closeModal();
  };

  useEffect(() => {
    if(selectedLength > 4) {
      setMaxIntersts(true);
      dispatch({
        type: 'UPDATE_NESTED_STATE',
        state: 'home',
        nestedState: 'interestsDropdown',
        value: 'closed'
      });
    }else if(maxInterests){
      setMaxIntersts(false);
      dispatch({
        type: 'UPDATE_NESTED_STATE',
        state: 'home',
        nestedState: 'interestsDropdown',
        value: 'open'
      });
    };
  }, [selectedInterests]);
  
  return (
    <Modal 
      closeOnEscape={false}
      size={'small'} 
      open={true} 
      onClose={closeModal}
      closeOnDimmerClick={false}
      basic
    >
      <Modal.Header as='h1' style={{textAlign: 'center'}}>Select your interests</Modal.Header>
      <Modal.Content>
        <Counter progress={selectedLength}/>
        <ProgressBar />
        <InterestsDropdown />
      </Modal.Content>
      <Modal.Actions>
        <Button 
          basic
          color='red' 
          inverted
          content='Cancel'
          onClick={closeModal}
        />
        <Button
          color='teal' 
          inverted
          positive
          icon='checkmark'
          content='Update'
          onClick={submitInterests}
        />
      </Modal.Actions>
    </Modal>
  );
};