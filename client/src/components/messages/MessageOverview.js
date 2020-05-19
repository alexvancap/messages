import React from 'react'
import { Container, Header } from 'semantic-ui-react'
import { NewMessageBtn, MessageCard } from './'

export const MessageOverview = () => {
    return (
        <Container id='message-overview'>
            <Container id='message-header'>
                <Header id='msgs-header-text'>Previous Messages</Header>
                <Container id='messages-border-btm'/>
                <Container id='message-cards-cont'>
                    <MessageCard />
                    <MessageCard />
                </Container>
                <NewMessageBtn />
            </Container>
        </Container>
    )
}