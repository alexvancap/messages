import React from 'react'
import { useSelector } from 'react-redux'
import { FriendCard } from './FriendCard'

export const FriendList = () => {
    const friendList = useSelector(state => state.friends.friendList)
    const confirmedFriends = friendList.filter(friend => friend.status === 1)
    

    return (
        <div id='friends-list-container'>
            {confirmedFriends.map(friend => <FriendCard key={friend.friendID} friend={friend}/>)}
        </div>
    )
}