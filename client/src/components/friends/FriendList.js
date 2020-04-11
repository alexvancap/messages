import React, {useEffect} from 'react'
import { Grid, Image } from 'semantic-ui-react'
import backendUrl from '../../constants'
import { useSelector, useDispatch } from 'react-redux'
import {FriendCard} from './FriendCard'

export const FriendList = () => {
    const dispatch = useDispatch()
    const friendList = useSelector(state => state.friends.friendList)

    useEffect(() => {
            fetch(`http://localhost:4000/get-friends`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage['authToken']}`,
                    'Accept': 'application/json'
                }
            }).then(res => res.json())
            .then(res => {
                dispatch({type: 'update_friend_list', friends: res})})
    }, [])
    return (
        <div>
            <Grid columns='three' divided>
                {friendList.map(friend => <FriendCard friend={friend}/>)}
            </Grid>
            
        </div>
    )
}