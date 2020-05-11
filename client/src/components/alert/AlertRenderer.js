import React, { useState } from 'react'
import { Message, Transition } from 'semantic-ui-react'
import socket from './../../socket.config'

export const AlertRenderer = (props) => {
    const [isVisible, setVisible] = useState(true)

    const closeAlert = () => {
        setVisible(false)
        socket.emit('remove-alert', {id: props.alert.id})
    }
    return (
        <Transition
          animation="drop"
          duration={1000}
          unmountOnHide={true}
          visible={isVisible}
        >
            <Message
                style={{marginTop: 0}}
                color='teal'
                onDismiss={() => closeAlert()}
                header={props.alert.header}
                content={props.alert.content}
            />
        </Transition>
    )
}