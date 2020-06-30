import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, TextArea } from 'semantic-ui-react'
import { useSocket } from '../../../../hooks/useSocket'
import { BioCounter } from './BioCounter'

export const EditBioModal = () => {
  const dispatch = useDispatch()
  const bio = useSelector(state => state.user.bio)
  const socket = useSocket()

  const closeModal = () =>
    dispatch({type: 'UPDATE_NESTED_STATE', state: 'home', nestedState: 'openModal', value: ''})

  const updateBio = (e) => {
    if(e.target.value.length <= 140) 
      dispatch({type: 'UPDATE_NESTED_STATE', state: 'user', nestedState: 'bio', value: e.target.value})
  }
  
  const submitBio = () => 
    socket.emit('update-bio', bio)

  const cancelEdit = () => 
    socket.emit('get-bio')
  

  useEffect(() => {
    socket
      .on('update-bio', (res) => {
        dispatch({type: 'UPDATE_NESTED_STATE', state: 'user', nestedState: 'bio', value: res.bio})
        closeModal()
      })
      .on('get-bio', (res) => {
        dispatch({type: 'UPDATE_NESTED_STATE', state: 'user', nestedState: 'bio', value: res.bio})
        closeModal()
      })
  }, [])


  return (
    <Modal 
      size={'small'} 
      open={true} 
      onClose={closeModal}
      closeOnDimmerClick={false}
      basic
    >
      <Modal.Header as='h1' style={{textAlign: 'center'}}>Edit your Bio</Modal.Header>
      <Modal.Content>
        <BioCounter />
        <TextArea 
          placeholder='Click and start typing to fill in a bio' 
          id='bio-modal-text-area' 
          onChange={updateBio} 
          value={bio} 
        />
      </Modal.Content>
      <Modal.Actions>
        <Button 
          basic
          color='red'
          inverted
          negative
          content='Cancel'
          onClick={cancelEdit}
        />
        <Button
          color='teal'
          inverted
          positive
          icon='checkmark'
          content='Update'
          onClick={submitBio}
        />
      </Modal.Actions>
    </Modal>
  )
}