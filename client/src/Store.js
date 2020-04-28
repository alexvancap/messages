import { createStore } from 'redux'

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
                friend.id === action.friendID 
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
        default:
            break ;
    }
    return currentState
}

const initialState = {
    currentPage: '/',
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
            filter: '&&filter=none'
        },
        fetchedFriends: false,
        friendList: [],
        activeTab: 'Friends'
    }
}

export const store = createStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)