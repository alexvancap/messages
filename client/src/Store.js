import { createStore } from 'redux'

const reducer = (currentState, action) => {
    switch (action.type){
        case 'LOGIN_FORM_CHANGE':
            return {
                ...currentState,
                loginForm: {
                    ...currentState.loginForm,
                    [action.key]: action.value
                }
            }
        case 'SAVE_USER_DATA':
            return {
                ...currentState,
                user: {
                    ...currentState.userData,
                    ...action.data
                }
            }
        default:
            break ;
    }
    return currentState
}

const initialState = {
    user: {
        id: null,
        username: '',
        email: '',
        first_name: '',
        last_name: ''
    },
    loginForm: {
        username: '',
        password: '',
        stayLoggedIn: false,
        checkedBox: false
    }
}

export const store = createStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)