import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from 'semantic-ui-react'
import history from '../../../history'
import { useSocket } from '../../../hooks/useSocket'
import { MessagesContainer } from './MessagesContainer'
import { NewMessageForm } from './NewMessageForm'

export const MessageBox = () => {
    const dispatch = useDispatch()
    const socket = useSocket()
    const messages = useSelector(state => state.chat.messages)


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
    
    return (
        <Container id='message-box'>
            <Container id='messages-header'>
                <h4 id='messages-header-text'>
                    Alexander Van Cappellen
                </h4>
            </Container>
                <MessagesContainer />
            <NewMessageForm />
        </Container>
    )
}