import { createStore } from 'redux'
import history from './history'

const reducer = (currentState, action) => {
    switch (action.type){
        case 'UPDATE_STATE': 
            return {
                ...currentState,
                ...action.state
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
        default:
            break ;
    }
    return currentState
}

const initialState = {
    currentPage: history.location.pathname === '/login' ? 'Login' : '',
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

        stayLoggedIn: false,
        checkedBox: false,
        formSubmitted: false
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
    socket: false
}

export const store = createStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)