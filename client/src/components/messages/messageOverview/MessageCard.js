import React, { useEffect } from 'react'
import { Container } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import { useSocket } from '../../../hooks/useSocket'

export const MessageCard = (props) => {
    const dispatch = useDispatch()
    const socket = useSocket()

    const cardClick = () => {
        dispatch({type: 'UPDATE_NESTED_STATE', state: 'chat', nestedState: 'currentConv', value: props.conv})
        socket.emit('join-room', props.conv.id)
        socket.emit('get-messages', {conversationID: props.conv.id})
    }

    const scrollToBotom = (element) => {
        element.scrollIntoView({ behavior: 'smooth' });
    }
    useEffect(() => {
        
    }, [])
    return (
        <Container 
            className='message-card'
            onClick={cardClick}
        >
            <img className='message-card-img' src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
            <p className='message-card-text'>hallo</p>
            <p className='message-card-username'>{props.conv.username}</p>
            <p className='message-card-date'>13/09/1998</p>
        </Container>
    )
}