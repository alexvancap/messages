import React, { useEffect } from 'react'
import { Container, Header } from 'semantic-ui-react'
import { NewMessageBtn, MessageCard } from '..'
import { useSocket } from '../../../hooks/useSocket'
import { useDispatch, useSelector } from 'react-redux'
import history from '../../../history'

export const MessageOverview = () => {
    const socket = useSocket()
    const dispatch = useDispatch()
    const conversations = useSelector(state => state.chat.conversations)
    useEffect(() => {
        if(socket === false)
            return history.push('/login')
        socket.emit('get-conversations')
        .on('get-conversations', (data) => {
            dispatch({type: 'UPDATE_NESTED_STATE', state: 'chat', nestedState: 'conversations', value: data})
        })
    }, [])
    return (
        <Container id='message-overview'>
            <NewMessageBtn />
            <Container id='previous-messages-header'>
                <Header id='msgs-header-text'>Previous Messages</Header>
                <Container id='messages-border-btm'/>
            </Container>
            <Container id='message-cards-cont'>
                {
                   conversations.map((conv => <MessageCard conv={conv}/>)) 
                }                  
                </Container>
        </Container>
    )
}