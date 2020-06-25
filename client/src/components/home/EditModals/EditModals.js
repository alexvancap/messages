import React from 'react'
import { useSelector } from 'react-redux'
import { EditBioModal } from './EditBioModal'
import { EditInterestsModal } from './EditInterestsModal'

export const EditModals = () => {
  const currentModal = useSelector(state => state.home.openModal)

  if(currentModal === 'bio')
    return <EditBioModal open={true}/>
  else if(currentModal === 'hobbies')
    return <EditInterestsModal open={true}/>
  return <div id='empty-modal'></div>
}