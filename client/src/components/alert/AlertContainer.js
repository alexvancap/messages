import React from 'react'
import { useSelector } from 'react-redux'
import { AlertRenderer } from './AlertRenderer'

// holds all the messages
export const AlertContainer = () => {
    const messages = useSelector(state => state.user.alerts)

    return (
        <div id='message-container'>
            {/* itterates over all the massages in state and creates a message component for them*/}
            { messages.map(message => 
                <AlertRenderer message={message} />
            ) }
        </div>
    )
}