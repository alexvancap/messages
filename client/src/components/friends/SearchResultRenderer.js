import React, { useEffect } from 'react'
import { checkIfFriends } from './../../helperFunctions/checkIfFriends'
import { Button, Icon } from 'semantic-ui-react'
import { useSelector } from 'react-redux'

export const SearchResultRenderer = (props) => {
    console.log(props.friend)
    const friendList = useSelector(state => state.friends.friendList)

    const iconInButton = (user) => {
        if(checkIfFriends(user.friendId, friendList)){
            if(user.friendshipStatus === 0) return 'check'
            else return 'user'
        }
        return 'add user'
    }
    return(
        <div className='search-result-container'>
            {/* <img className="search-result-img" alt="user avatar" src={user.image} /> */}
            <div className="search-result-username" >{props.friend.title}</div>
            <div className="search-result-name">{props.friend.fullName}</div>
            <div id='add-friend-btn-cont'>
                <Button
                    disabled={checkIfFriends(props.friend.friendId, friendList)}
                    id='addFriendBtn'
                    compact fluid 
                    size='medium' 
                    color={'teal'} 
                    className="add-friend-btn" 
                    icon={
                        <Icon 
                            name={`${iconInButton(props.friend)}`} 
                            id='addFriendBtn'
                            color='white'
                        />
                    }
                />
            </div>
        </div>
    )
}