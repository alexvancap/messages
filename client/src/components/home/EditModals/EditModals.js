import React from 'react'
import { useSelector } from 'react-redux'
import { EditBioModal } from './editBioModal/EditBioModal'
import { EditInterestsModal } from './editInterestsModal/EditInterestsModal'

export const EditModals = () => {
  const currentModal = useSelector(state => state.home.openModal)

  if(currentModal === 'bio')
    return <EditBioModal />
  else if(currentModal === 'interests')
    return <EditInterestsModal />
  return <div id='empty-modal'></div>
}