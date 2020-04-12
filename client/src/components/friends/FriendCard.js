import React from 'react'
import { Card, Button, Image } from 'semantic-ui-react'
import constants from './../../constants'
import {useDispatch, useSelector } from 'react-redux'

export const FriendCard = (props) => {
    const dispatch = useDispatch()
    const friendList = useSelector(state => state.friends.friendList)
    let friendsSince = new Date(props.friend.friends_since)
    friendsSince = `${friendsSince.getDay()}/${friendsSince.getMonth()}/${friendsSince.getFullYear()}`

    const removeFriend = () => {
        fetch(`${constants.backendUrl}/remove-friend/${props.friend.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage['authToken']}`
            }
        }).then(res => res.json())
        .then(res => {
            if(res.success){
                dispatch({type: 'UPDATE_FRIEND_LIST', 
                    friends: friendList.filter(friend => 
                        friend.id !== props.friend.id
                    )
                })
            }

        })
    }

    return (
        <div className='friend-card-container'>
            <Card fluid>
                <Image src={props.friend.avatar} wrapped ui={false} />
                <Card.Content>
                <Card.Header>{props.friend.username}</Card.Header>
                <Card.Description>
                    {props.friend.first_name + ' ' + props.friend.last_name}
                </Card.Description>
                <Card.Meta>Friends Since {friendsSince}</Card.Meta>
                </Card.Content>
                <Card.Content extra>
                <div className='ui two buttons'>
                    <Button basic color='teal'>
                        Profile
                    </Button>
                    <Button 
                        basic color='red'
                        onClick={() => removeFriend()}
                    >
                        Remove
                    </Button>
                </div>
                </Card.Content>
            </Card>
        </div>
    )
}