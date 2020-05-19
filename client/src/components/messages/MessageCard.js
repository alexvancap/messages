import React from 'react'
import { Container } from 'semantic-ui-react'

export const MessageCard = () => {
    return (
        <Container className='message-card'>
            <div className='message-card-img' />
            <p className='message-card-text'>hallo</p>
            <p className='message-card-username'>alexvancap</p>
            <p className='message-card-date'>13/09/1998</p>
        </Container>
    )
}