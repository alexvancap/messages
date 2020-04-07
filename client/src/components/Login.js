import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import history from './../history'
// import {useSelector, useDispatch} from 'react-redux'

export const Login = () => {
    const loginData = useSelector(state => state.loginForm)
    const dispatch = useDispatch()
    useEffect(() => {
        // Call our fetch function below once the component mounts
        // fetch('/express_backend')
        //     .then(res => res.json())
        //     .then(res => dispatch({type: 'UPDATE_DATA', data: res.express}))

    }, [])

    const handleLogin = (e) => {
        e.preventDefault()
        fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage['authToken']}`,
                'Accept': 'application/json' ,
            },
            body: JSON.stringify({
                username: loginData.username,
                password: loginData.password,
                rememberUser: loginData.checkedBox
            })
        }).then(res => res.json())
        .then(res => {
            if(res.data){
                console.log(res.data)
                dispatch({type: 'SAVE_USER_DATA', data: res.data})
                if(typeof(res.token) !== 'undefined') localStorage.setItem('authToken', res.token)
                history.push('/')
            }else{
                console.log(res.message)
            }
        })
    }

    return (
        <div id="loginContainer">
            <p id="login-text">Welcome, please log in or register below.</p>
            <form id="loginForm" className="ui form">
                <div className="field">
                    <label>Username</label>
                    <input type="text" 
                        name="username" 
                        placeholder="Username"
                        onChange={(e) => dispatch({type: 'LOGIN_FORM_CHANGE', key: 'username', value: e.target.value})}
                        value={loginData.username}
                    />
                </div>
                <div className="field">
                    <label>Password</label>
                    <input type="password" 
                    name="password" 
                    placeholder="Password" 
                    onChange={(e) => dispatch({type: 'LOGIN_FORM_CHANGE', key: 'password', value: e.target.value})}
                    value={loginData.password}/>
                </div>
                <div className="field">
                    <div className="ui checkbox">
                        <input type="checkbox"
                            className="checkbox"
                            name='rememberMeBox' 
                            defaultChecked={loginData.checkedBox}
                            onClick={ e => dispatch({type: 'LOGIN_FORM_CHANGE', key: 'checkedBox', value: !loginData.checkedBox}) } 
                        />
                        <label>Remember me</label>
                    </div>             
                </div>
                <div id="login-buttons">
                    <button className="ui button" type="submit" onClick={(e) => handleLogin(e)}>Submit</button>
                    <button id="login-register-btn" className="ui button" type="submit">Register</button>
                </div>
            </form>
        </div>
    )
}