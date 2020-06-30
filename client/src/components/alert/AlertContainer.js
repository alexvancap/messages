import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSocket } from '../../hooks/useSocket'
import history from './../../history'
import { AlertRenderer } from './AlertRenderer'

// holds all the messages
export const AlertContainer = () => {
    const dispatch = useDispatch()
    const currentPage = useSelector(state => state.currentPage)
    // gets all the messages
    const alerts = useSelector(state => state.alerts)
    const socket = useSocket()
    useEffect(() => {
        if (!socket) return history.push('/login')
        if(currentPage !== 'Login')
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
    }, [currentPage])

    if (alerts === [] || socket === {} || alerts === undefined || history.location.pathname === '/login')
        return <div></div>
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