import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Transition, Container } from 'semantic-ui-react';
import io from 'socket.io-client';
import history from '../../history';
import constants from './../../constants';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';


export const Login = () => {

    const loginData = useSelector(state => state.loginForm)
    const loginOrSignup = useSelector(state => state.loginOrSignup)
    const dispatch = useDispatch()
    const token = sessionStorage['authToken']


    useEffect(() => {
        dispatch({type: 'UPDATE_STATE', 
            state: {
                loginOrSignup: 'login'
            }
        })
        if(token !== undefined){
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
                //saves the socket to state
                dispatch({ type: 'UPDATE_STATE',
                    state: {
                        socket: socket
                    }
                })
                console.log('checked for token')
                return history.push('/')
            })
        }
    }, [])

    const handleLogin = (e) => {
        e.preventDefault()
        fetch(`${constants.backendUrl}/login`, {
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
                dispatch({ type: 'UPDATE_STATE',
                state: {
                    socket: socket
                }
            })
                history.push('/')
            }else{
                console.log(res.message)
            }
        })
    }

    return (
        <Transition.Group
            animation={'horizontal flip'}
            duration={1000}
        >
            {loginOrSignup === '' && 
                <Container id='login-container'>
                </Container>}
            {loginOrSignup === 'login' && 
                <Container id='login-container'>
                    <LoginForm 
                        loginData={loginData} 
                        handleLogin={handleLogin}
                    />
                </Container>
            }
            {loginOrSignup === 'signup' && 
                <Container id="register-container">
                    <RegisterForm />
                </Container>
            }

        </Transition.Group>
    )
}