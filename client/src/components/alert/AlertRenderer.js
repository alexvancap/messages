import React, { useState}  from 'react'
import { Message } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import socket from './../../socket.config'

export const AlertRenderer = (props) => {
    return (
        <Message
            style={{marginTop: 0}}
            color='teal'
            onDismiss={() => socket.emit('remove-alert', {id: props.alert.id})}
            header={props.alert.header}
            content={props.alert.content}
        />
    )
}