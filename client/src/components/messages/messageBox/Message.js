import React from 'react'
import { Container } from 'semantic-ui-react'

export const Message = (props) => {
    return (
        <Container className='message-cont'>
            <img className='message-img' style={{float: 'left'}} src='https://react.semantic-ui.com/images/avatar/small/matt.jpg'/>
            <p className='message-content' style={{float: 'left'}}>{props.content}</p>
        </Container>
    )
}