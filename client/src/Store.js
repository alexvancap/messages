import { createStore } from 'redux'
import history from './history'

const reducer = (currentState, action) => {
    switch (action.type){
        case 'UPDATE_STATE': 
            return {
                ...currentState,
                ...action.state
            }
        case 'UPDATE_NESTED_STATE': 
            return {
                ...currentState,
                [action.state]: {
                    ...currentState[action.state],
                    [action.nestedState]: action.value
                }
            }
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
                    ...action.data
                }
            }
        case 'UPDATE_VALIDATION_ERRORS':
            return {
                ...currentState,
                validationErrors: {
                    ...currentState.validationErrors,
                    [action.form]: {
                        ...action.errors
                    }
                }
            }
        case 'SEARCH_USER_CHANGE':
            return {
                ...currentState,
                friends: {
                    ...currentState.friends,
                    search: {
                        ...currentState.friends.search,
                        ...action.object
                    }
                },
            }
        case 'CLEAR_SEARCH_STATE':
            return {
                ...currentState,

                friends: {
                        ...currentState.friends,
                    search: {
                        ...initialState.friends.search
                    }
                }
            }
        case 'UPDATE_FRIEND_LIST':
            return {
                ...currentState,
                friends: {
                    ...currentState.friends,
                    fetchedFriends: true,
                    friendList: action.friends
                }
            }
        case 'CHANGE_FRIEND_STATUS':
            const updatedFriendlist = currentState.friends.friendList.map(friend => 
                friend.userID === action.friendID 
                ? {...friend, status: action.status}
                : friend
            )
            return {
                ...currentState,
                friends: {
                    ...currentState.friends,
                    friendList: updatedFriendlist
                }
            }
        case 'ACTIVE_FRIENDS_TAB':
            return {
                ...currentState,
                friends: {
                    ...currentState.friends,
                    activeTab: action.state
                }
            }
        case 'ADD_FRIEND':
            return {
                ...currentState,
                friends: {
                    ...currentState.friends,
                    friendList: [
                        ...currentState.friends.friendList, action.newFriend
                    ]
                }
            }
        case 'GET_ALERTS':
            return {
                ...currentState,
                alerts: action.alerts
            }
        case 'ADD_ALERT':
            return {
                ...currentState,
                alerts: [
                    ...currentState.user.alerts, action.alert
                ]
            }
        case 'REMOVE_ALERT':
            const alertsWithoutCurrent = currentState.alerts.filter(alert => alert.id !== action.id)
            return {
                ...currentState,
                alerts: alertsWithoutCurrent
            }
        case 'CHANGE_CHAT_STATE':
            return {
                ...currentState,
                chat: {
                    ...currentState.chat,
                    [action.stateKey]: action.stateValue
                }
            }
        default:
            break ;
    }
    return currentState
}

const initialState = {
    currentPage: 'Login',
    user: {
        id: null,
        username: '',
        email: '',
        first_name: '',
        last_name: ''
    },
    loginOrSignup: 'login',
    loginForm: {
        username: '',
        password: '',
        repeatedPassword: '',
        email: '',
        firstName: '',
        lastName: '',
        formSubmitted: false
    },
    validationErrors: {
        login: {},
        register: {}
    },
    friends: {
        search: {
            isLoading: false,
            results: [],
            value: "",
            filter: '&&filter=none'
        },
        fetchedFriends: false,
        friendList: [],
        activeTab: 'Friends'
    },
    alerts: [],
    socket: false,
    chat: {
        newMessageUser: {},
        target_user: {},
        messages : [],
        conversations: []
    }
}

export const store = createStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)