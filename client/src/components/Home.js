import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { checkToken } from './helperFunctions/checkToken'
import history from './../history'


export const Home = (props) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    

    useEffect(() => {
        if(user.id === null){
            checkToken(dispatch, user)
        }
    }, [user.id, dispatch])

    return (
        <h1>Welcome {user.username}</h1>
    )
}