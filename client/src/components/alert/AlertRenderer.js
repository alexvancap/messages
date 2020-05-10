import React, { useState}  from 'react'
import { Message } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'

export const AlertRenderer = (props) => {
    const dispatch = useDispatch()
    return (
        <Message
            style={{marginTop: 0}}
            color='teal'
            onDismiss={() => dispatch({type: 'REMOVE_ALERT', id: props.alert.id})}
            header={props.alert.header}
            content={props.alert.content}
        />
    )
}