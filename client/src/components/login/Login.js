import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import history from '../../history'
import socket from '../../socket.config'
import { LoginForm } from './LoginForm'
// import {useSelector, useDispatch} from 'react-redux'

export const Login = () => {
    const token = sessionStorage['authToken']
    const loginData = useSelector(state => state.loginForm)
    const dispatch = useDispatch()
    useEffect(() => {
        if(token){
            socket.on("unauthorized", function(error, callback) {
                if (error.data.type === "UnauthorizedError" || error.data.code === "invalid_token") {
                  // redirect user to login page perhaps or execute callback:
                  callback();
                  console.log("User's token has expired");
                }
            });
            socket.emit('test', 'lol')
            // socket.on('authenticated', () => {
            //     socket.on('')
            //     socket.on('get-user-data', (data) => {
            //         dispatch({type: 'SAVE_USER_DATA', data: data[0]})
            //         history.push('/')
            //     })
            // })
        }
        // Call our fetch function below once the component mounts
        // fetch('/express_backend')
        //     .then(res => res.json())
        //     .then(res => dispatch({type: 'UPDATE_DATA', data: res.express}))

    }, [])

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
                sessionStorage['authToken'] = res.token
                dispatch({type: 'SAVE_USER_DATA', data: res.data})
                if(typeof(res.token) !== 'undefined') localStorage.setItem('authToken', res.token)
                dispatch({type: 'LOGIN_FORM_CHANGE', key: 'formSubmitted', value: false})
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