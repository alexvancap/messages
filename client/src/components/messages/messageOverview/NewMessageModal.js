import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Dropdown, Header, Icon, Modal } from 'semantic-ui-react'
import { useSocket } from '../../../hooks/useSocket'
import history from '../../../history'

export const NewMessageModal = (props) => {
    const friendList = useSelector(state => state.friends.friendList)
    const socket = useSocket()
    const dispatch = useDispatch()
    const selectedUser = useSelector(state => state.chat.newMessageUser)
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
        if(socket === false)
            return history.push('/login')
        socket.on('start-conversation', (res) => {
            console.log('res', res)
            // dispatch({type: 'CHANGE_CHAT', target_user: 0, messages: []})
        })
    }, [])

    const createMessage = (e, data) => {
        props.handleModal()
        dispatch({
            type: 'CHANGE_CHAT_STATE', 
            stateKey: 'targetUser', 
            stateValue: selectedUser
        })
        socket
            .emit('start-conversation', {target_user_id: selectedUser.userID})
    }
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
                    onChange={(e, data) => dispatch({
                        type: 'CHANGE_CHAT_STATE', 
                        stateKey: 'newMessageUser', 
                        stateValue: data.value
                    })}
                />
            </Modal.Content>
            <Modal.Actions>
            <Button color='red' onClick={props.handleModal} inverted>
                <Icon name='checkmark' /> cancel
            </Button>
            <Button color='teal' onClick={createMessage} inverted>
                <Icon name='checkmark' /> Message
            </Button>
            </Modal.Actions>
        </Modal>
    )
}