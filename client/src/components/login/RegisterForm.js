import React, { useState } from 'react'
import { Form, Container, Button } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import constants from '../../constants'
import { calculateErrorSpace } from './../../helperFunctions'


export const RegisterForm = () => {
    const dispatch = useDispatch()
    const formValue = useSelector(state => state.loginForm)
    const errors = useSelector(state => state.validationErrors.register)

    const handleButtonClick = () => {
        dispatch({type: 'UPDATE_STATE', 
                state: {
                    loginOrSignup: 'none'
                }
            })
        dispatch({
            type: 'UPDATE_VALIDATION_ERRORS', 
            form: 'register', 
            errors: {}
        })
        //then mounts the login
        setTimeout(() => {
            dispatch({type: 'UPDATE_STATE', 
                state: {
                    loginOrSignup: 'login'
                }
            })
        }, 700);
        
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`${constants.backendUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({
                ...formValue
            })
        }).then(res => res.json())
        .then(res => {
            if(res.hasError) 
                dispatch({
                    type: 'UPDATE_VALIDATION_ERRORS', 
                    form: 'register', 
                    errors: res.errors
                })
            else handleButtonClick()
        })
    }

    const handleFormChange = (e, key) => {
        dispatch({type: 'LOGIN_FORM_CHANGE', key: key, value: e.target.value})
    }


    return (
        <Container >
            <h1>Signup</h1>
            <Form id='register-form'>
                <Form.Input 
                    fluid 
                    label='Email adress' 
                    placeholder='Email'
                    type='email'
                    onChange={(e) => handleFormChange(e, 'email')}
                    value={formValue.email}
                    error={errors['email']}
                />
                <Form.Input 
                    fluid 
                    label='Username' 
                    placeholder='Username'
                    type='text'
                    onChange={(e) => handleFormChange(e, 'username')}
                    value={formValue.username}
                    error={errors.username}
                />
                <Form.Group widths='equal'>
                    <Form.Input 
                        fluid
                        label='First name' 
                        placeholder='First name'
                        type='text'
                        onChange={(e) => handleFormChange(e, 'firstName')}
                        value={formValue.firstName}
                        error={errors.firstName}
                    />
                    <Form.Input 
                        fluid 
                        label='Last name' 
                        placeholder='Last name' 
                        type='text'
                        onChange={(e) => handleFormChange(e, 'lastName')}
                        value={formValue.lastName}
                        error={errors.lastName}
                    />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input 
                        fluid
                        label='Password'
                        placeholder='Password'
                        type='password' 
                        onChange={(e) => handleFormChange(e, 'password')}
                        value={formValue.password}
                        error={errors.password}
                    />
                    <Form.Input 
                        fluid 
                        label='Repeat password' 
                        placeholder='Repeat password' 
                        type='password'
                        onChange={(e) => handleFormChange(e, 'repeatedPassword')}
                        value={formValue.repeatedPassword}
                        error={errors.repeatedPassword}
                    />
                </Form.Group>
                <div className="login-buttons">
                    <Button
                        onClick={handleSubmit}   
                    >Submit</Button>
                    <Button 
                        className='login-action-btn'
                        onClick={(e) => {
                            e.preventDefault()
                            handleButtonClick()
                        }}
                    >Cancel</Button>
                </div>
            </Form>
        </Container>
    )
}