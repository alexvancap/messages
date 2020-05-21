import React from 'react'
import { Button, Container, Form } from 'semantic-ui-react'
import { Message } from './Message'

export const MessageBox = () => {
    return (
        <Container id='message-box'>
            <Container id='messages-header'>
                <h4 id='messages-header-text'>
                    Alexander Van Cappellen
                </h4>
            </Container>
            <Container id='messages-content'>
                <Message />
                <Message />
                <Message />
            </Container>
            <Form reply>
                <Form.TextArea />
                <Button id='send-message-button' color='teal' content='Send' labelPosition='left' icon='edit' />
            </Form>
        </Container>
    )
}