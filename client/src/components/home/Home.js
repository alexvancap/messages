import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import constants from './../../constants'
import { Statistics } from './Statistics'


export const Home = (props) => {
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    
    useEffect(() => {
        //doesn't load because users are not fetched no time to fix this now
        if(!state.friends.fetchedFriends){
            fetch(`${constants.backendUrl}/get-friends`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage['authToken']}`,
                    'Accept': 'application/json'
                }
            }).then(res => res.json())
            .then(res => {
                dispatch({type: 'UPDATE_FRIEND_LIST', friends: res})})
        }
    }, [])

    if(state.user.username)
        return (
            <div id="home-container">
                <h1>Welcome {state.user.username}</h1>
                <Statistics user={state}/>
            </div>
        )
    else
        return(
            <div className="ui active red elastic large loader"></div>
        )

    
}