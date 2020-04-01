import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

export const Home = (props) => {
    const data = useSelector(state => state.data)
    const dispatch = useDispatch()
    useEffect(() => {
        // Call our fetch function below once the component mounts
        fetch('/express_backend')
            .then(res => res.json())
            .then(res => dispatch({type: 'UPDATE_DATA', data: res.express}))

    }, [])

    return (
        <div>
            <p className="App-intro">{data}</p>
        </div>
    )
}