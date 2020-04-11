import React from 'react'
import { useSelector } from 'react-redux'
import { FriendCard } from './FriendCard'

export const FriendList = () => {
    const friendList = useSelector(state => state.friends.friendList)

    return (
        <div id='friends-list-container'>
            {friendList.map(friend => <FriendCard key={friend.id} friend={friend}/>)}
        </div>
    )
}