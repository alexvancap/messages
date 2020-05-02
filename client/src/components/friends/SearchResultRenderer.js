import React, { useState } from 'react'
import { checkIfFriends } from './../../helperFunctions/checkIfFriends'
import { Button, Icon } from 'semantic-ui-react'
import { useSelector } from 'react-redux'

export const SearchResultRenderer = (props) => {
    const [addedFriend, setAddedFriend] = useState(checkIfFriends(props.friend.friendId, props.friendList))
    console.log(addedFriend)

    const iconInButton = (user) => {
        if(checkIfFriends(user.friendId, props.friendList)){
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
                    disabled={addedFriend}
                    onClick={() => setAddedFriend(true)}
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
                            onClick={() => setAddedFriend(true)}
                        />
                    }
                />
            </div>
        </div>
    )
}