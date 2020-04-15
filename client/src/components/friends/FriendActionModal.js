import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Button, Header, Icon, Dropdown, Container, TextArea, Form } from 'semantic-ui-react'
import constants from './../../constants'

export const FriendActionModal = (props) => {
    const dispatch = useDispatch()
    const friendsState = useSelector(state => state.friends)
    const userID = useSelector(state => state.user)
    const actionOptions = [
        {key: 1, text: 'unfriend', value: 0},
        {key: 2, text: 'block', value: 2},
        {key: 3, text: 'report', value: 3}
    ]

    console.log(userID)

    const handleActionSubmit = () => {
        fetch(`${constants.backendUrl}/changeFriendStatus/${userID}/${props.friend.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage['authToken']}`,
            }
        }).then(res => res.json())
        .then(console.log)
    }

    return (
        <Modal 
            open={friendsState.actionModal}
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
                                (e, input) => dispatch({
                                    type: 'UPDATE_FRIENDS_ACTION', mode: input.value
                                })
                            }
                        />
                        {friendsState.actionMode === 3 
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
                    dispatch({type: 'HANDLE_ACTION_MODAL', open: false})
                }
            >
                <Icon name='remove' /> Cancel
            </Button>
            <Button color='teal' inverted
                onClick={() => handleActionSubmit()}
            >
                <Icon name='checkmark' /> Confirm
            </Button>
            </Modal.Actions>
        </Modal>
    )
}