import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Dropdown, Form, Header, Icon, Modal, TextArea } from 'semantic-ui-react'
import constants from './../../constants'

export const FriendActionModal = (props) => {
    const dispatch = useDispatch()
    const [actionMode, setActionMode] = useState(null)
    const friendsState = useSelector(state => state.friends)
    const userID = useSelector(state => state.user)

    const actionOptions = [
        {key: 1, text: 'unfriend', value: -1},
        {key: 2, text: 'block', value: 2},
        {key: 3, text: 'report', value: 3}
    ]



    const handleActionSubmit = () => {
        fetch(`${constants.backendUrl}/change-friend-status/${actionMode}/${props.friend.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage['authToken']}`,
            }
        }).then(res => res.json())
        .then(res => {
            if(res.success)
                dispatch({type: 'CHANGE_FRIEND_STATUS', friendID : props.friend.id, status: actionMode})
            }
        )
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
                            options={actionOptions} 
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