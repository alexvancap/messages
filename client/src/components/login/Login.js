import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import history from '../../history'
import { LoginForm } from './LoginForm'
import io from 'socket.io-client';
import constants from './../../constants'
// import {useSelector, useDispatch} from 'react-redux'

export const Login = () => {
    const loginData = useSelector(state => state.loginForm)
    const dispatch = useDispatch()

    const token = sessionStorage['authToken']
    if(token !== undefined)
        console.log(token)
        fetch(`${constants.backendUrl}/authenticate-token`, {
            headers: {
                'Content-Type': 'Application/json',
                'Authorization': token
            }
        }).then((res) => res.json())
        .then((res) => {
            dispatch({type: 'SAVE_USER_DATA', data: res.data})
            const socket = io.connect(constants.backendUrl, {
                'query': 'token=' + token
            });
            dispatch({type: 'SAVE_SOCKET', socket: socket})
            history.push('/')
        })

    const handleLogin = (e) => {
        e.preventDefault()
        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage['authToken']}`
            },
            body: JSON.stringify({
                username: loginData.username,
                password: loginData.password,
                rememberUser: loginData.checkedBox
            })
        }).then(res => res.json())
        .then(res => {
            if(res.data){
                dispatch({type: 'SAVE_USER_DATA', data: res.data})
                if(typeof(res.token) !== 'undefined') sessionStorage.setItem('authToken', res.token)
                dispatch({type: 'LOGIN_FORM_CHANGE', key: 'formSubmitted', value: false})
                const socket = io.connect(constants.backendUrl, {
                    'query': 'token=' + res.token
                });
                dispatch({type: 'SAVE_SOCKET', socket: socket})
                history.push('/')
            }else{
                console.log(res.message)
            }
        })
    }

    return (
        <div id="loginContainer">
            <p id="login-text">Welcome, please log in or register below.</p>
            <LoginForm 
                loginData={loginData} 
                handleLogin={handleLogin} 
            />
        </div>
    )
}