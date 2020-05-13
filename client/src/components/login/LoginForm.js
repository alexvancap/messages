import React from 'react'
import { useDispatch } from 'react-redux'

export const LoginForm = (props) => {
    const dispatch = useDispatch()
    
    return (
        <form id="login-form" className="ui form">
            <div className="field">
                <label>Username</label>
                <input type="text" 
                    name="username" 
                    placeholder="Username"
                    onChange={(e) => dispatch({type: 'LOGIN_FORM_CHANGE', key: 'username', value: e.target.value})}
                    value={props.loginData.username}
                />
            </div>
            <div className="field">
                <label>Password</label>
                <input type="password" 
                name="password" 
                placeholder="Password" 
                onChange={(e) => dispatch({type: 'LOGIN_FORM_CHANGE', key: 'password', value: e.target.value})}
                value={props.loginData.password}/>
            </div>
            <div className="field">
                <div className="ui checkbox">
                    <input type="checkbox"
                        className="checkbox"
                        name='rememberMeBox' 
                        defaultChecked={props.loginData.checkedBox}
                        onClick={ e => dispatch({type: 'LOGIN_FORM_CHANGE', key: 'checkedBox', value: !props.loginData.checkedBox}) } 
                    />
                    <label>Remember me</label>
                </div>             
            </div>
            <div id="login-buttons">
                <button 
                    className={`ui ${props.loginData.formSubmitted ? 'loading' : ''} button`} 
                    type="submit" 
                    onClick={(e) => {
                        props.handleLogin(e)
                        dispatch({type: 'LOGIN_FORM_CHANGE', key: 'formSubmitted', value: true})
                    }}
                    >Submit</button>
                <button 
                    id="login-register-btn" 
                    className="ui button" 
                    type="button"
                    onClick={() => 
                        dispatch({type: 'UPDATE_STATE', 
                            state: {
                                loginOrSignup: 'signup'
                            }
                        })
                    }
                >Register</button>
            </div>
        </form>
    )
}