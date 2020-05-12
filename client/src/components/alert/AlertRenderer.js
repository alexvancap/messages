import React, { useState, useEffect } from 'react'
import { Message, Transition } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import { useSocket } from './../../hooks/useSocket'
import history from '../../history'

export const AlertRenderer = (props) => {
    useEffect(() => {
        if (!socket)
            return history.push('/login')
    }, [])
    const [isVisible, setVisible] = useState(true)
    const socket = useSocket()

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