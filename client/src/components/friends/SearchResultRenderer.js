import React from 'react'
import { useSelector } from 'react-redux' // to handle state change
import { AddFriendButton } from './AddFriendButton' // the add friend button ofc

export const SearchResultRenderer = (props) => {

    return(
        <div className='search-result-container'>
            {/* <img className="search-result-img" alt="user avatar" src={user.image} /> */}
            <div className="search-result-username" >{props.friend.title}</div>
            <div className="search-result-name">{props.friend.fullName}</div>
            <div id='add-friend-btn-cont'>
                {
                    <AddFriendButton 
                        friend={props.friend}
                    />
                }
            </div>
        </div>
    )
}