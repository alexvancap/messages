import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Dropdown, Header, Icon, Modal } from 'semantic-ui-react'
import { useSocket } from './../../hooks/useSocket'

export const NewMessageModal = (props) => {
    const friendList = useSelector(state => state.friends.friendList)
    let friendOptions = []

    if(friendOptions = [])
        friendOptions = friendList.map(friend => {
            return {
                key: friend.userID,
                text: friend.username,
                value: friend,
                img: {avatar: false, src: friend.avatar}
            }
        })

    useEffect(() => {
        
    }, [])
    return (
        <Modal
            open={props.modalOpen}
            onClose={props.handleModal}
            basic
            size='tiny'
        >
            <Header icon='comment alternate outline' content='New message' />
            <Modal.Content>
                <h3>Please select a friend to start a conversation.</h3>
                <Dropdown
                    id='add-message-dropdown'
                    placeholder='Select Friend'
                    fluid
                    selection
                    options={friendOptions}
                />
            </Modal.Content>
            <Modal.Actions>
            <Button color='red' onClick={props.handleModal} inverted>
                <Icon name='checkmark' /> cancel
            </Button>
            <Button color='teal' onClick={props.handleModal} inverted>
                <Icon name='checkmark' /> Message
            </Button>
            </Modal.Actions>
        </Modal>
    )
}