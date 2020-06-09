import React from 'react'
import { Container } from 'semantic-ui-react'
import { useSelector } from 'react-redux'

export const Message = (props) => {
    const userId = useSelector(state => state.user.id)
    if (props.message.id === userId)
        return (
            <Container className='message-cont'>
                <img className='message-img' style={{float: 'left'}} src='https://react.semantic-ui.com/images/avatar/small/matt.jpg'/>
                <p className='message-content' style={{float: 'left'}}>{props.message.content}</p>
            </Container>
        )
    else
        return (
            <Container className='message-cont out'>
                <p className='message-content out' style={{float: 'left'}}>{props.message.content}</p>
                <img className='message-img out' style={{float: 'left'}} src='https://react.semantic-ui.com/images/avatar/small/matt.jpg'/>
            </Container>
        )
}