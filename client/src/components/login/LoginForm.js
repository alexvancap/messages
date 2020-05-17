import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'semantic-ui-react';
import constants from './../../constants';
import io from 'socket.io-client';
import history from './../../history'

export const LoginForm = (props) => {
    const [ authError, setAuthError] = useState(false)
    const dispatch = useDispatch()
    const formValue = useSelector(state => state.loginForm)
    const loginData = useSelector(state => state.loginForm)

    // first dismounts the login form
    const handleSignupClick = () => {
        dispatch({type: 'UPDATE_STATE', 
                state: {
                    loginOrSignup: 'none'
                }
            })
    //then mounts the signupform
        setTimeout(() => {
            dispatch({type: 'UPDATE_STATE', 
                state: {
                    loginOrSignup: 'signup'
                }
            })
        }, 700);
    }

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
            dispatch({type: 'LOGIN_FORM_CHANGE', key: 'formSubmitted', value: false})
            if(res.data){
                dispatch({type: 'SAVE_USER_DATA', data: res.data})
                if(typeof(res.token) !== 'undefined') sessionStorage.setItem('authToken', res.token)
                const socket = io.connect(constants.backendUrl, {
                    'query': 'token=' + res.token
                });
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
                history.push('/')
                
            }else{
                setAuthError(res.error)
            }
        })
    }

    return (
        <Form id="login-form">
            <Form.Input 
                fluid 
                label='Username' 
                placeholder='Username'
                type='text'
                onChange={(e) => dispatch({type: 'LOGIN_FORM_CHANGE', key: 'username', value: e.target.value})}
                value={formValue.username}
                error={authError.type === 'username' ? authError.message : false}
            />
            <Form.Input 
                fluid 
                label='Password' 
                placeholder='Password'
                type='password'
                onChange={(e) => dispatch({type: 'LOGIN_FORM_CHANGE', key: 'password', value: e.target.value})}
                value={formValue.password}
                error={authError.type === 'password' ? authError.message : false}
            />
            <div className="login-buttons">
                <button 
                    className={`ui ${props.loginData.formSubmitted ? 'loading' : ''} button`} 
                    type="submit" 
                    onClick={(e) => {
                        handleLogin(e)
                        dispatch({type: 'LOGIN_FORM_CHANGE', key: 'formSubmitted', value: true})
                    }}
                    >Submit</button>
                <button 
                    className="ui button login-action-btn" 
                    type="button"
                    onClick={() => handleSignupClick()}
                >Register</button>
            </div>
        </Form>
    )
}