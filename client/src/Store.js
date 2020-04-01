import { createStore } from 'redux'

const initialState = {
    data: ''
}

const reducer = (currentState, action) => {
    switch(action.type){
        case 'UPDATE_DATA':
            return {...currentState, data: action.data}
        default:
            return currentState
    }
}

const store = createStore(
    reducer, 
    initialState, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store