import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Transition, Container } from 'semantic-ui-react';
import io from 'socket.io-client';
import history from '../../history';
import constants from './../../constants';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { calculateErrorSpace } from './../../helperFunctions'

export const Login = () => {

    const loginData = useSelector(state => state.loginForm)
    const loginOrSignup = useSelector(state => state.loginOrSignup)
    const dispatch = useDispatch()
    const token = sessionStorage['authToken']
    const authErrors = useSelector(state => state.validationErrors)


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
                dispatch({type: 'SAVE_USER_DATA', data: res})
                const socket = io.connect(constants.backendUrl, {
                    'query': 'token=' + token
                });
                //saves the socket to state
                dispatch({ type: 'UPDATE_STATE',
                    state: {
                        socket: socket
                    }
                })
                dispatch({
                    type: 'UPDATE_STATE', 
                    state: {
                        currentPage: 'Home'
                    }
                })
                return history.push('/')
            })
        }
    }, [])

    return (
        <Transition.Group
            animation={'horizontal flip'}
            duration={1000}
        >
            {
                loginOrSignup === '' && 
                    <Container id='login-container'>
                    </Container>
            }
            {
                loginOrSignup === 'login' && 
                    <Container id='login-container'
                        style={{
                            height: 400 + calculateErrorSpace(Object.keys(authErrors.login))
                        }}
                    >
                        <LoginForm 
                            loginData={loginData} 
                        />
                    </Container>
            }
            {
                loginOrSignup === 'signup' && 
                    <Container id="register-container"
                        style={{height: 450 + calculateErrorSpace(Object.keys(authErrors.register))}}
                    >
                        <RegisterForm />
                    </Container>
            }
        </Transition.Group>
    )
}