import React from 'react'
import { Container } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import { useSocket } from '../../../hooks/useSocket'

export const MessageCard = (props) => {
    const dispatch = useDispatch()
    const socket = useSocket()

    const cardClick = () => {
        console.log('props.conv', props.conv)
        dispatch({type: 'UPDATE_NESTED_STATE', state: 'chat', nestedState: 'currentConv', value: props.conv})
        socket.emit('get-messages', {conversationID: props.conv.id})
    }
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