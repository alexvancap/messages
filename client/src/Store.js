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
        case 'SEARCH_USER_CHANGE':
            return {
                ...currentState,
                friends: {
                    ...currentState.friends,
                    search: {
                        ...currentState.friends.search,
                        [action.key]: action.value
                    }
                },
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
        checkedBox: false,
        formSubmitted: false
    },
    friends: {
        search: {
            isLoading: false,
            results: [],
            value: "",
            filter: 'none'
        }
    }
}

export const store = createStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)