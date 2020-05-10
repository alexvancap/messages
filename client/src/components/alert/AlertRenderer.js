import React, { useState}  from 'react'
import { Message } from 'semantic-ui-react'

export const AlertRenderer = (props) => {
    const [displayMsg, setDisplatMsg] = useState(true)
    if (displayMsg)
        return (
            <Message
                style={{marginTop: 0}}
                color='teal'
                onDismiss={() => setDisplatMsg(false)}
                header={props.message.header}
                content={props.message.content}
            />
        )
    else
        return <div></div>
}