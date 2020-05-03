import React, { useState } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { checkIfFriends } from './../../helperFunctions/checkIfFriends'

export const AddFriendButton = (props) => {
    const [disabled, setDisabled] = useState(checkIfFriends(props.friend.friendId, props.friendList))

    const iconInButton = (user) => {
        if(checkIfFriends(user.friendId, props.friendList)){
            if(user.friendshipStatus === 0) return 'check'
            else return 'user'
        }
        return 'add user'
    }

    return (
        <Button
            disabled={disabled}
            id='addFriendBtn'
            compact fluid 
            size='medium' 
            color={'teal'} 
            className="add-friend-btn" 
            onClick={setDisabled}
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