import React from 'react'
import { Container, Header } from 'semantic-ui-react'
import { NewMessageBtn } from './NewMessageBtn'

export const MessageOverview = () => {
    return (
        <Container id='message-overview'>
            <Container id='prev-msgs-header'>
                <Header style={{marginTop: '5%'}}>Previous Messages</Header>
                <Container id='messages-border-btm'/>
                <Container id='message-cards-cont'>

                </Container>
                <NewMessageBtn />
            </Container>
        </Container>
    )
}