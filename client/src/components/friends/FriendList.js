import React, {useEffect} from 'react'
import { Grid, Image } from 'semantic-ui-react'
import constants from '../../constants'
import { useSelector, useDispatch } from 'react-redux'
import {FriendCard} from './FriendCard'

export const FriendList = () => {
    const dispatch = useDispatch()
    const friendList = useSelector(state => state.friends.friendList)

    useEffect(() => {
            fetch(`${constants.backendUrl}/get-friends`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage['authToken']}`,
                    'Accept': 'application/json'
                }
            }).then(res => res.json())
            .then(res => {
                dispatch({type: 'UPDATE_FRIEND_LIST', friends: res})})
    }, [])
    return (
        <div id='friends-list-container'>
            {friendList.map(friend => <FriendCard key={friend.id} friend={friend}/>)}
        </div>
    )
}