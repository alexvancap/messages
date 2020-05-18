import React from 'react'
import { Container, Icon } from 'semantic-ui-react'

export const NewMessageBtn = () => {
    return (
        <Container id='new-msg-btn-cont'>
            <Icon name='plus' id='new-msg-icon'/>
            <h3 id='new-msg-text'>Add Message</h3>
        </Container>
    )
}