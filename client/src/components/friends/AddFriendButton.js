import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Icon } from 'semantic-ui-react'
import { checkIfFriends } from './../../helperFunctions'
import { useSocket } from '../../hooks/useSocket'

export const AddFriendButton = (props) => {
    const socket = useSocket()
    const dispatch = useDispatch()
    const friendList = useSelector(state => state.friends.friendList)
    const isFriends = checkIfFriends(props.friend.friendId, friendList)

    const iconInButton = (user) => {
        if(isFriends){
            if(user.friendshipstatus === 0) return 'check'
            else return 'user'
        }
        return 'add user'
    }

    const addFriend = () => {
        const newFriend = {...props.friend, status: 0}
        console.log(newFriend)
        dispatch({type: 'CLEAR_SEARCH_STATE'})
        socket.emit('add-friend', newFriend)
    }

    return (
        <Button
            disabled={isFriends}
            id='addFriendBtn'
            compact fluid 
            size='medium' 
            color={'teal'} 
            className="add-friend-btn" 
            onClick={addFriend}
            icon={
                <Icon 
                    name={`${iconInButton(props.friend)}`} 
                    id='addFriendBtn'
                    color='white'
                />
            }
        />
    )
}