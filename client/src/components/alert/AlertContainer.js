import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import socket from './../../socket.config'
import { AlertRenderer } from './AlertRenderer'
import { Transition } from 'semantic-ui-react'

// holds all the messages
export const AlertContainer = () => {
    const dispatch = useDispatch()
    // gets all the messages
    const alerts = useSelector(state => state.alerts)

    useEffect(() => {
        socket
            .emit('get-alerts')
            .on('get-alerts', (res) =>{
                if (res !== undefined)
                    dispatch({type: 'GET_ALERTS', alerts: res})
            })
            .on('remove-alert', (res) => {
                dispatch({type: 'REMOVE_ALERT', id: res})
            })
            .on('create-alert', (alert) => {
                console.log(alert)
            })
    }, [])

    if (alerts === [] || alerts === undefined)
        return (
            <div></div>
        )
    else
        return (
            <div id='alert-container'>
                {/* itterates over all the massages in state and creates a message component for them*/}
                { alerts.map( alert => 
                    <AlertRenderer key={alert.id} alert={alert} />
                ) }
            </div>
        )
}