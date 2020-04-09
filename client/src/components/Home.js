import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkToken } from './../helperFunctions/checkToken'


export const Home = (props) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    

    useEffect(() => {
        if(user.id === null){
            checkToken(dispatch, user)
        }
    }, [user.id, user, dispatch])

    if(user.username)
        return (
            <div id="home-container">
                <h1>Welcome {user.username}</h1>
            </div>
        )
    else
        return(
            <div className="ui active red elastic large loader"></div>
        )

    
}