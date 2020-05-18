import React from 'react'
import { Container } from 'semantic-ui-react'
import { MessageBox } from './'
import { MessageOverview } from './MessageOverview'

export const Messages = () => {
    return (
        <Container id='messages-container'>
            <MessageBox />
            <MessageOverview />
        </Container>
    )
}