import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import socket from './../../socket.config'
import { AlertRenderer } from './AlertRenderer'

// holds all the messages
export const AlertContainer = () => {
    const dispatch = useDispatch()
    // gets all the messages
    const alerts = useSelector(state => state.user.alerts)
    useEffect(() => {
        socket
            .emit('get-alerts')
            .on('get-alerts', (res) =>{
                dispatch({type: 'GET_ALERTS', alerts: res})
            }
            )
    }, [])

    if (alerts === [] || alerts[0] === undefined)
        return (
            <div></div>
        )
    else
        return (
            <div id='alert-container'>
                {/* itterates over all the massages in state and creates a message component for them*/}
                { alerts.map(alert => 
                    <AlertRenderer alert={alert} />
                ) }
            </div>
        )
}