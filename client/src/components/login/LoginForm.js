import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form } from 'semantic-ui-react'

export const LoginForm = (props) => {
    const dispatch = useDispatch()
    const formValue = useSelector(state => state.loginForm)

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
    
    return (
        <Form id="login-form">
            <Form.Input 
                fluid 
                label='Username' 
                placeholder='Username'
                type='text'
                onChange={(e) => dispatch({type: 'LOGIN_FORM_CHANGE', key: 'username', value: e.target.value})}
                value={formValue.username}
            />
            <Form.Input 
                fluid 
                label='Password' 
                placeholder='Password'
                type='password'
                onChange={(e) => dispatch({type: 'LOGIN_FORM_CHANGE', key: 'password', value: e.target.value})}
                value={formValue.password}
            />
        <div className="login-buttons">
            <button 
                className={`ui ${props.loginData.formSubmitted ? 'loading' : ''} button`} 
                type="submit" 
                onClick={(e) => {
                    props.handleLogin(e)
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