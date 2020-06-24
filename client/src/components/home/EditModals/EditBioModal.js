import React from 'react'
import { Modal, TextArea, Button} from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { useSocket } from './../../../hooks/useSocket'

export const EditBioModal = (props) => {
  const dispatch = useDispatch()
  const bioText = useSelector(state => state.home.bioText)
  const socket = useSocket()

  const closeModal = () => {
    dispatch({type: 'UPDATE_NESTED_STATE', state: 'home', nestedState: 'openModal', value: ''})
  }

  const updateBio = (e) => {
    dispatch({type: 'UPDATE_NESTED_STATE', state: 'home', nestedState: 'bioText', value: e.target.value})
  }

  const submitBio = () => {
    socket.emit('update-bio', bioText, (res) => {
      dispatch({type: 'UPDATE_NESTED_STATE', state: 'home', nestedState: 'bioText', value: res})
      closeModal()
    })
  }


  return (
    <Modal 
      size={'small'} 
      open={props.open} 
      onClose={closeModal}
      closeOnDimmerClick={false}>
      <Modal.Header>Edit your Bio</Modal.Header>
      <Modal.Content>
        <TextArea id='bio-modal-text-area' onChange={updateBio} value={bioText} />
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
          onClick={submitBio}
        />
      </Modal.Actions>
    </Modal>
  )
}