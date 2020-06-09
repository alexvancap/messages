import React, { useEffect } from 'react'
import { Button, Container, Form } from 'semantic-ui-react'
import { Message } from './Message'
import { useDispatch, useSelector } from 'react-redux'
import { useSocket } from '../../../hooks/useSocket'
import history from '../../../history'
import { NewMessageForm } from './NewMessageForm'

export const MessageBox = () => {
    const dispatch = useDispatch()
    const socket = useSocket()
    const messages = useSelector(state => state.chat.messages)


  
//     id(pin):5
// content(pin):"lol"
// conversation_id(pin):69
// timestamp(pin):"2020-06-02T03:51:42.000Z"

    useEffect(() => {
        if (!socket) return history.push('/login')
            socket.on('get-messages', (messages) => {
                dispatch({
                    type: 'UPDATE_NESTED_STATE', 
                    state: 'chat', 
                    nestedState: 'messages', 
                    value: messages
                })
                }
            )
    }, [])

    window.scroll({bottom: 0})
    return (
        <Container id='message-box'>
            <Container id='messages-header'>
                <h4 id='messages-header-text'>
                    Alexander Van Cappellen
                </h4>
            </Container>
            <Container id='messages-content'>
                {
                    messages.map(message => 
                        <Message key={message.id} message={message} />
                    )
                }
            </Container>
            <NewMessageForm />
        </Container>
    )
}