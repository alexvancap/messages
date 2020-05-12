import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux' // to handle state
import { Button, Dropdown, Form, Header, Icon, Modal, TextArea } from 'semantic-ui-react' // imports semantic ui components
import { useSocket } from './../../hooks/useSocket'
import history from '../../history'

export const FriendActionModal = (props) => {
    const socket = useSocket()
    const [actionMode, setActionMode] = useState(null)
    const activeTab = useSelector(state => state.friends.activeTab)

    if(!socket) history.push('/login')

    const actionOptions = [
        {key: 1, text: 'unfriend', value: -1},
        {key: 2, text: 'block', value: 2},
        {key: 3, text: 'report', value: 3}
    ]
    const pendingActionOptions = [
        {key: 1, text: 'cancel request', value: -1},
        {key: 2, text: 'block', value: 2},
    ]

    // runs when the submit button is pressed
    const handleActionSubmit = () => {
        // sends a socket request to the backend
        socket.emit('change-friend-status', {mode: actionMode, friendId: props.friend.userID})
    }

    return (
        <Modal 
            open={props.openModal}
            basic style={{maxWidth: 380}}
        >
            <Header icon='remove user' content='Edit relationship' />
            <Modal.Content style={{marginTop: -20}}>
                Please select the action(s) you want to take with {props.friend.username}
                <Form id="act-mod-form">
                    <Dropdown 
                        id='act-mod-drop-down'
                        clearable 
                        options={activeTab === 'Pending' ?  pendingActionOptions : actionOptions} 
                        selection 
                        onChange={
                            (e, input) => setActionMode(input.value)
                        }
                    />
                    {actionMode === 3 
                        ? 
                            <TextArea id='act-mod-text-area' 
                                placeholder='Please define the reason of the report'
                            />
                        : 
                            null
                    }
                </Form>
            </Modal.Content>
            <Modal.Actions>
            <Button 
                basic color='red' inverted
                onClick={() => 
                    props.setOpenModal(false)
                }
            >
                <Icon name='remove' /> Cancel
            </Button>
            <Button color='teal' inverted
                onClick={() => {
                    handleActionSubmit()
                    props.setOpenModal(false)
                }}
            >
                <Icon name='checkmark' /> Confirm
            </Button>
            </Modal.Actions>
        </Modal>
    )
}