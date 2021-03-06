import React from 'react'
import { useSelector } from 'react-redux' // to help handle state change
import { FriendCard } from './FriendCard' 

export const TabContent = (props) => {
    const activeTab = useSelector(state => state.friends.activeTab)
    
    if (activeTab === 'Friends'){
        if (props.confirmedFriends.length === 0)
            return <div id='no-friends-div'>No friends, add some by searching above</div>
        return props.confirmedFriends.map(friend => <FriendCard key={friend.friendID} friend={friend} />)
    }
    else if (activeTab === 'Pending'){
        if (props.pendingFriends.length === 0)
            return <div id='no-friends-div'>No friends, add some by searching above</div>
        return props.pendingFriends.map(friend => <FriendCard key={friend.friendID} friend={friend} />)
    }
    else if (activeTab === 'Blocked'){
        if (props.blockedFriends.length === 0)
            return <div id='no-friends-div'>You haven't blocked any users yet</div>
        return props.blockedFriends.map(friend => <FriendCard key={friend.friendID} friend={friend} />)
    }
}