import React from 'react'
import { AddFriendButton } from './AddFriendButton'
import { checkIfFriends } from './../../helperFunctions/checkIfFriends'
import {useSelector} from 'react-redux'

export const SearchResultRenderer = (props) => {
    const friendList = useSelector(state => state.friends.friendList)

    return(
        <div className='search-result-container'>
            {/* <img className="search-result-img" alt="user avatar" src={user.image} /> */}
            <div className="search-result-username" >{props.friend.title}</div>
            <div className="search-result-name">{props.friend.fullName}</div>
            <div id='add-friend-btn-cont'>
                {
                    checkIfFriends(props.friend.friendId, props.friendList) 
                    ?   <AddFriendButton 
                            isDisabled={true} 
                            friend={props.friend}
                            friendList={friendList}
                        />
                    :   <AddFriendButton 
                            isDisabled={false} 
                            friend={props.friend}
                            friendList={friendList}
                        />
                }
            </div>
        </div>
    )
}