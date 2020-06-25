import React, { useEffect } from 'react'
import { Modal, TextArea, Button} from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { useSocket } from '../../../../hooks/useSocket'

export const EditBioModal = () => {
  const dispatch = useDispatch()
  const bio = useSelector(state => state.user.bio)
  const socket = useSocket()

  const closeModal = () =>
    dispatch({type: 'UPDATE_NESTED_STATE', state: 'home', nestedState: 'openModal', value: ''})

  const updateBio = (e) => 
    dispatch({type: 'UPDATE_NESTED_STATE', state: 'user', nestedState: 'bio', value: e.target.value})
  
  const submitBio = () => socket.emit('update-bio', bio)

  const cancelEdit = () => socket.emit('get-bio')
  

  useEffect(() => {
    socket
      .on('update-bio', (res) => {
        console.log(res)
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
      closeOnDimmerClick={false}>
      <Modal.Header>Edit your Bio</Modal.Header>
      <Modal.Content>
        <TextArea 
          placeholder='Click and start typing to fill in a bio' 
          id='bio-modal-text-area' 
          onChange={updateBio} 
          value={bio} 
        />
      </Modal.Content>
      <Modal.Actions>
        <Button 
          negative
          content='Cancel'
          onClick={cancelEdit}
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