import React from 'react'
import {Container, Image} from 'semantic-ui-react'

export const Message = () => {
    return (
        <Container className='message-cont'>
            <img className='message-img' style={{float: 'left'}} src='https://react.semantic-ui.com/images/avatar/small/matt.jpg'/>
            <p className='message-content' style={{float: 'left'}}>hkaflecaenc</p>
        </Container>
    )
}