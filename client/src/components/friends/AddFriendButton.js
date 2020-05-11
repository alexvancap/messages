import React, { useState } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { checkIfFriends } from './../../helperFunctions/checkIfFriends'

export const AddFriendButton = (props) => {
    let isFriends = checkIfFriends(props.friend.friendId, props.friendList)
    const [disabled, setDisabled] = useState(isFriends)

    const iconInButton = (user) => {
        if(checkIfFriends(user.friendId, props.friendList)){
            if(user.friendshipstatus === 0) return 'check'
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