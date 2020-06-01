import React from 'react'
import { Container } from 'semantic-ui-react'

export const MessageCard = (props) => {
    return (
        <Container className='message-card'>
            <img className='message-card-img' src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
            <p className='message-card-text'>hallo</p>
            <p className='message-card-username'>{props.conv.username}</p>
            <p className='message-card-date'>13/09/1998</p>
        </Container>
    )
}