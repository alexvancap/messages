import React from 'react'
import { useSelector } from 'react-redux'
import { EditBioModal } from './EditBioModal'
import { EditHobbiesModal } from './EditHobbiesModal'

export const EditModals = () => {
  const currentModal = useSelector(state => state.home.openModal)

  if(currentModal === 'bio')
    return <EditBioModal open={true}/>
  else if(currentModal === 'hobbies')
    return <EditHobbiesModal open={true}/>
  return <div id='empty-modal'></div>
}