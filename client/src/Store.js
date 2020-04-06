import { createStore } from 'redux'

const reducer = (currentState, action) => {
    switch (action.type){
        case 'HANDLE_NAV_CLICK':
            return {
                ...currentState,
                navBar: {
                    clicked: action.clickedItem
                }
            }
        break ;
    }
    return currentState
}

const initialState = {
    loggedinUser: ''
}

export const store = createStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)