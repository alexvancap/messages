import React, {useState} from 'react'
import { Modal, Header, Button, Icon, Dropdown } from 'semantic-ui-react'

export const NewMessageModal = (props) => {
    const friendOptions = [
        {
          key: 'Jenny Hess',
          text: 'Jenny Hess',
          value: 'Jenny Hess',
          image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
        },
        {
          key: 'Elliot Fu',
          text: 'Elliot Fu',
          value: 'Elliot Fu',
          image: { avatar: true, src: '/images/avatar/small/elliot.jpg' },
        },
    ]
    return (
        <Modal
            open={props.modalOpen}
            onClose={props.handleModal}
            basic
            size='tiny'
        >
            <Header icon='comment alternate outline' content='New message' />
            <Modal.Content>
                <h3>Please select a friend to start a conversation</h3>
                <Dropdown
                    id='add-message-dropdown'
                    placeholder='Select Friend'
                    fluid
                    selection
                    options={friendOptions}
                />
            </Modal.Content>
            <Modal.Actions>
            <Button color='green' onClick={props.handleModal} inverted>
                <Icon name='checkmark' /> Got it
            </Button>
            </Modal.Actions>
        </Modal>
    )
}