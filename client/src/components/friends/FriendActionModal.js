import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Button, Header, Icon, Dropdown, Container, Label } from 'semantic-ui-react'

export const FriendActionModal = (props) => {
    const dispatch = useDispatch()
    const actionMode = useSelector(state => state.friends.actionMode)
    const actionOptions = [
        {key: 0, text: 'unfriend', value: 0},
        {key: 1, text: 'block', value: 1},
        {key: 2, text: 'report', value: 2}
    ]

    return (
        <Modal trigger={<Button 
            basic color='red'

        >
            Actions
            </Button>} basic style={{maxWidth: 380}}>
            <Header icon='remove user' content='Edit relationship' />
            <Modal.Content style={{marginTop: -20}}>
                Please select the action(s) you want to take with {props.friend.username}
                <Container id="act-mod-choises">
                    <Dropdown clearable options={actionOptions} selection />
                </Container>
            </Modal.Content>
            <Modal.Actions>
            <Button basic color='red' inverted>
                <Icon name='remove' /> Cancel
            </Button>
            <Button color='teal' inverted>
                <Icon name='checkmark' /> Confirm
            </Button>
            </Modal.Actions>
        </Modal>
    )
}