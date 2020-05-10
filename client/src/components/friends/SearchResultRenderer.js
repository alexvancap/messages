import React from 'react'
import { useSelector } from 'react-redux' // to handle state change
import { checkIfFriends } from './../../helperFunctions/checkIfFriends' // a function that checks if you are friends
import { AddFriendButton } from './AddFriendButton' // the add friend button ofc

export const SearchResultRenderer = (props) => {
    // gets the current friends out of state
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