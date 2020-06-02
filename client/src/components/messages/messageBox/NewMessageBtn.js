import React, {useState} from 'react'
import { Container, Icon } from 'semantic-ui-react'
import { NewMessageModal } from '..'

export const NewMessageBtn = () => {
    const [ modalOpen, setModalOpen ] = useState(false)

    const handleModal = () => setModalOpen(!modalOpen)

    return (
        <Container 
            id='new-msg-btn-cont'
            onClick={handleModal}
        >
            <Icon name='plus' id='new-msg-icon'/>
            <h3 id='new-msg-text'>Add Message</h3>
            <NewMessageModal 
                modalOpen={modalOpen}
                handleModal={handleModal}
            />
        </Container>
    )
}