import React, { useState}  from 'react'
import { Message } from 'semantic-ui-react'

export const GenerateAlert = (props) => {
    const [displayMsg, setDisplatMsg] = useState(true)
    
    if (displayMsg)
        return (
            <Message
                onDismiss={() => setDisplatMsg(false)}
                header={props.header}
                content={props.content}
            />
        )
}