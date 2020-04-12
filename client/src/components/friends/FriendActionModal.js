import React from 'react'
import { Modal, Button, Header, Icon } from 'semantic-ui-react'

export const FriendActionModal = (props) => {
    return (
        <Modal trigger={<Button 
            basic color='red'
            // onClick={() => ()}
        >
            Actions
            </Button>} basic size='tiny'>
            <Header icon='remove user' content='Edit relationship' />
            <Modal.Content>
            <p>
                Please select the action you want to take with {props.friend.username}
        
            </p>
            </Modal.Content>
            <Modal.Actions>
            <Button basic color='red' inverted>
                <Icon name='remove' /> No
            </Button>
            <Button color='green' inverted>
                <Icon name='checkmark' /> Yes
            </Button>
            </Modal.Actions>
        </Modal>
    )
}