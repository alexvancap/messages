import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import history from '../../history'
import { LoginForm } from './LoginForm'
import socket from './../../socket.config'
// import {useSelector, useDispatch} from 'react-redux'

export const Login = () => {
    const loginData = useSelector(state => state.loginForm)
    const dispatch = useDispatch()
    useEffect(() => {
        // Call our fetch function below once the component mounts
        // fetch('/express_backend')
        //     .then(res => res.json())
        //     .then(res => dispatch({type: 'UPDATE_DATA', data: res.express}))

        socket.on('login', (data) => {console.log(data)})
    }, [])

    const handleLogin = (e) => {
        e.preventDefault()
        // fetch('http://localhost:4000/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${localStorage['authToken']}`,
        //         'Accept': 'application/json' ,
        //     },
        //     body: JSON.stringify({
        //         username: loginData.username,
        //         password: loginData.password,
        //         rememberUser: loginData.checkedBox
        //     })
        // }).then(res => res.json())
        // .then(res => {
        //     if(res.data){
        //         console.log(res.data)
        //         dispatch({type: 'SAVE_USER_DATA', data: res.data})
        //         if(typeof(res.token) !== 'undefined') localStorage.setItem('authToken', res.token)
        //         dispatch({type: 'LOGIN_FORM_CHANGE', key: 'formSubmitted', value: false})
        //         history.push('/')
        //     }else{
        //         console.log(res.message)
        //     }
        // })
            socket.emit('login', {
                username: loginData.username,
                password: loginData.password,
                rememberUser: loginData.checkedBox
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